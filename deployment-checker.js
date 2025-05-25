#!/usr/bin/env node
import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

class DeploymentReadinessChecker {
  constructor() {
    this.checks = [];
    this.warnings = [];
    this.errors = [];
    this.score = 0;
    this.maxScore = 0;
  }

  async runAllChecks() {
    console.log('🚀 Deployment Readiness Checker');
    console.log('================================\n');

    await this.checkPackageJson();
    await this.checkDependencies();
    await this.checkEnvironmentVariables();
    await this.checkPortConfiguration();
    await this.checkFileStructure();
    await this.checkBuildProcess();
    await this.checkSecurityVulnerabilities();
    await this.checkPerformanceMetrics();

    this.generateReport();
    return this.getReadinessStatus();
  }

  addCheck(name, status, message, weight = 1) {
    this.checks.push({ name, status, message, weight });
    this.maxScore += weight;
    if (status === 'pass') {
      this.score += weight;
    } else if (status === 'warning') {
      this.warnings.push(`⚠️  ${name}: ${message}`);
      this.score += weight * 0.5;
    } else {
      this.errors.push(`❌ ${name}: ${message}`);
    }
  }

  async checkPackageJson() {
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      
      // Check for required fields
      if (packageJson.name && packageJson.version && packageJson.main) {
        this.addCheck('Package.json Structure', 'pass', 'All required fields present');
      } else {
        this.addCheck('Package.json Structure', 'fail', 'Missing required fields (name, version, main)');
      }

      // Check scripts
      if (packageJson.scripts && packageJson.scripts.start) {
        this.addCheck('Start Script', 'pass', 'Start script configured');
      } else {
        this.addCheck('Start Script', 'fail', 'Missing start script');
      }

      // Check dependencies
      if (packageJson.dependencies && Object.keys(packageJson.dependencies).length > 0) {
        this.addCheck('Dependencies Listed', 'pass', `${Object.keys(packageJson.dependencies).length} dependencies found`);
      } else {
        this.addCheck('Dependencies Listed', 'warning', 'No dependencies listed');
      }

      // Check for ES module configuration
      if (packageJson.type === 'module') {
        this.addCheck('Module Type', 'pass', 'ES modules properly configured');
      } else {
        this.addCheck('Module Type', 'warning', 'Consider using ES modules for modern deployment');
      }

    } catch (error) {
      this.addCheck('Package.json', 'fail', 'Package.json not found or invalid');
    }
  }

  async checkDependencies() {
    try {
      // Check if node_modules exists
      if (fs.existsSync('node_modules')) {
        this.addCheck('Dependencies Installed', 'pass', 'Node modules directory found');
      } else {
        this.addCheck('Dependencies Installed', 'fail', 'Node modules not installed');
        return;
      }

      // Check critical dependencies
      const criticalDeps = ['express'];
      for (const dep of criticalDeps) {
        try {
          const depPath = path.join('node_modules', dep);
          if (fs.existsSync(depPath)) {
            this.addCheck(`Critical Dependency: ${dep}`, 'pass', 'Available');
          } else {
            this.addCheck(`Critical Dependency: ${dep}`, 'fail', 'Missing');
          }
        } catch (error) {
          this.addCheck(`Critical Dependency: ${dep}`, 'fail', 'Cannot verify');
        }
      }

    } catch (error) {
      this.addCheck('Dependencies Check', 'fail', 'Cannot verify dependencies');
    }
  }

  async checkEnvironmentVariables() {
    const requiredEnvVars = ['SUPABASE_URL', 'SUPABASE_KEY'];
    const optionalEnvVars = ['PORT', 'NODE_ENV'];

    let foundRequired = 0;
    let foundOptional = 0;

    for (const envVar of requiredEnvVars) {
      if (process.env[envVar]) {
        foundRequired++;
        this.addCheck(`Env Var: ${envVar}`, 'pass', 'Configured');
      } else {
        this.addCheck(`Env Var: ${envVar}`, 'warning', 'Not set (may be needed for full functionality)');
      }
    }

    for (const envVar of optionalEnvVars) {
      if (process.env[envVar]) {
        foundOptional++;
      }
    }

    if (foundRequired === requiredEnvVars.length) {
      this.addCheck('Environment Configuration', 'pass', 'All required environment variables set');
    } else {
      this.addCheck('Environment Configuration', 'warning', 'Some environment variables missing');
    }
  }

  async checkPortConfiguration() {
    try {
      const indexJs = fs.readFileSync('index.js', 'utf8');
      
      // Check for proper port configuration
      if (indexJs.includes('process.env.PORT') || indexJs.includes('PORT')) {
        this.addCheck('Port Configuration', 'pass', 'Dynamic port configuration found');
      } else {
        this.addCheck('Port Configuration', 'warning', 'Consider using process.env.PORT for deployment flexibility');
      }

      // Check for proper host binding
      if (indexJs.includes('0.0.0.0') || indexJs.includes('process.env.HOST')) {
        this.addCheck('Host Binding', 'pass', 'Proper host binding configured');
      } else {
        this.addCheck('Host Binding', 'warning', 'Consider binding to 0.0.0.0 for deployment');
      }

    } catch (error) {
      this.addCheck('Port Configuration', 'fail', 'Cannot verify index.js');
    }
  }

  async checkFileStructure() {
    const requiredFiles = ['index.js', 'package.json'];
    const optionalFiles = ['.gitignore', 'README.md'];

    for (const file of requiredFiles) {
      if (fs.existsSync(file)) {
        this.addCheck(`Required File: ${file}`, 'pass', 'Present');
      } else {
        this.addCheck(`Required File: ${file}`, 'fail', 'Missing');
      }
    }

    let optionalCount = 0;
    for (const file of optionalFiles) {
      if (fs.existsSync(file)) {
        optionalCount++;
      }
    }

    if (optionalCount > 0) {
      this.addCheck('Optional Files', 'pass', `${optionalCount} optional files present`);
    } else {
      this.addCheck('Optional Files', 'warning', 'Consider adding .gitignore and README.md');
    }
  }

  async checkBuildProcess() {
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      
      if (packageJson.scripts && packageJson.scripts.build) {
        this.addCheck('Build Script', 'pass', 'Build script configured');
      } else {
        this.addCheck('Build Script', 'warning', 'No build script (may not be needed for simple Node.js apps)');
      }

      // Test if the application can start
      try {
        execSync('node -c index.js', { stdio: 'pipe' });
        this.addCheck('Syntax Check', 'pass', 'No syntax errors in main file');
      } catch (error) {
        this.addCheck('Syntax Check', 'fail', 'Syntax errors detected');
      }

    } catch (error) {
      this.addCheck('Build Process', 'fail', 'Cannot verify build configuration');
    }
  }

  async checkSecurityVulnerabilities() {
    try {
      // Check for common security issues
      const indexJs = fs.readFileSync('index.js', 'utf8');
      
      if (indexJs.includes('cors')) {
        this.addCheck('CORS Configuration', 'pass', 'CORS middleware detected');
      } else {
        this.addCheck('CORS Configuration', 'warning', 'Consider adding CORS for API security');
      }

      // Check for environment variable usage (security best practice)
      if (indexJs.includes('process.env')) {
        this.addCheck('Environment Variables', 'pass', 'Using environment variables for configuration');
      } else {
        this.addCheck('Environment Variables', 'warning', 'Consider using environment variables for sensitive data');
      }

    } catch (error) {
      this.addCheck('Security Check', 'warning', 'Cannot perform security analysis');
    }
  }

  async checkPerformanceMetrics() {
    try {
      // Check file sizes
      const indexSize = fs.statSync('index.js').size;
      if (indexSize < 50000) { // 50KB
        this.addCheck('Main File Size', 'pass', `${Math.round(indexSize/1024)}KB - optimal size`);
      } else {
        this.addCheck('Main File Size', 'warning', `${Math.round(indexSize/1024)}KB - consider optimization`);
      }

      // Check node_modules size (if exists)
      if (fs.existsSync('node_modules')) {
        this.addCheck('Dependencies Size', 'pass', 'Dependencies installed');
      }

    } catch (error) {
      this.addCheck('Performance Check', 'warning', 'Cannot analyze performance metrics');
    }
  }

  generateReport() {
    const percentage = Math.round((this.score / this.maxScore) * 100);
    
    console.log('\n📊 DEPLOYMENT READINESS REPORT');
    console.log('===============================\n');
    
    console.log(`Overall Score: ${this.score}/${this.maxScore} (${percentage}%)\n`);

    if (percentage >= 90) {
      console.log('🟢 EXCELLENT - Ready for deployment!');
    } else if (percentage >= 75) {
      console.log('🟡 GOOD - Minor improvements recommended');
    } else if (percentage >= 60) {
      console.log('🟠 FAIR - Some issues need attention');
    } else {
      console.log('🔴 POOR - Critical issues must be resolved');
    }

    console.log('\n📋 Detailed Results:');
    console.log('-------------------');
    
    this.checks.forEach(check => {
      const icon = check.status === 'pass' ? '✅' : check.status === 'warning' ? '⚠️' : '❌';
      console.log(`${icon} ${check.name}: ${check.message}`);
    });

    if (this.errors.length > 0) {
      console.log('\n🚨 Critical Issues:');
      this.errors.forEach(error => console.log(error));
    }

    if (this.warnings.length > 0) {
      console.log('\n⚠️  Warnings:');
      this.warnings.forEach(warning => console.log(warning));
    }

    console.log('\n💡 Recommendations:');
    console.log('------------------');
    this.generateRecommendations();
  }

  generateRecommendations() {
    if (this.score / this.maxScore >= 0.9) {
      console.log('✨ Your application is deployment-ready! Consider running this check before each deployment.');
    } else {
      console.log('🔧 Focus on resolving critical issues first, then address warnings for optimal deployment.');
      
      if (this.errors.some(e => e.includes('Package.json'))) {
        console.log('📦 Fix package.json configuration issues first');
      }
      
      if (this.errors.some(e => e.includes('Dependencies'))) {
        console.log('📚 Install missing dependencies with: npm install');
      }
      
      if (this.warnings.some(w => w.includes('Environment'))) {
        console.log('🔐 Set up environment variables for production deployment');
      }
    }
  }

  getReadinessStatus() {
    const percentage = (this.score / this.maxScore) * 100;
    return {
      ready: percentage >= 75,
      score: this.score,
      maxScore: this.maxScore,
      percentage: Math.round(percentage),
      errors: this.errors.length,
      warnings: this.warnings.length,
      checks: this.checks.length
    };
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const checker = new DeploymentReadinessChecker();
  const result = await checker.runAllChecks();
  
  console.log('\n🎯 Quick Status:');
  console.log(`Ready for deployment: ${result.ready ? 'YES' : 'NO'}`);
  console.log(`Score: ${result.percentage}%`);
  console.log(`Issues: ${result.errors} critical, ${result.warnings} warnings`);
  
  process.exit(result.ready ? 0 : 1);
}

export default DeploymentReadinessChecker;