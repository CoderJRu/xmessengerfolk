#!/usr/bin/env node

/**
 * xm-demos-rap - Minimal Node.js Project
 * 
 * A simple Node.js environment ready for forking and custom development.
 * This file serves as the main entry point for the application.
 */

console.log('Welcome to xm-demos-rap!');
console.log('This is a minimal Node.js environment ready for development.');
console.log('');
console.log('Node.js version:', process.version);
console.log('Platform:', process.platform);
console.log('Current working directory:', process.cwd());
console.log('');

// Simple function for module usage
function greet(name = 'World') {
  return `Hello, ${name}! Welcome to xm-demos-rap.`;
}

// If running directly (not imported), show interactive prompt
if (require.main === module) {
  console.log('Ready for development!');
  console.log('');
  console.log('To get started:');
  console.log('1. Modify this index.js file to build your application');
  console.log('2. Add dependencies to package.json as needed');
  console.log('3. Fork this project for your own custom development');
  console.log('');
  console.log('Example usage:');
  console.log('  node index.js');
  console.log('');
  
  // Simple test of the greet function
  console.log(greet());
  console.log(greet('Developer'));
}

module.exports = {
  greet
};