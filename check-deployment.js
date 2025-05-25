#!/usr/bin/env node
import DeploymentReadinessChecker from './deployment-checker.js';

console.log('🔍 Running Deployment Readiness Check...\n');

const checker = new DeploymentReadinessChecker();
const result = await checker.runAllChecks();

if (result.ready) {
  console.log('\n🎉 SUCCESS: Your application is ready for deployment!');
  process.exit(0);
} else {
  console.log('\n⚠️  WARNING: Issues detected that should be resolved before deployment.');
  process.exit(1);
}