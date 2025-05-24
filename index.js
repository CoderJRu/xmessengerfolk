#!/usr/bin/env node

/**
 * xmessenger-demos-lp2 - Minimal Node.js Project
 * 
 * A simple Node.js environment ready for forking and custom development.
 * This file serves as the main entry point for the application.
 */

console.log('Welcome to xmessenger-demos-lp2!');
console.log('This is a minimal Node.js environment ready for development.');
console.log('');
console.log('Node.js version:', process.version);
console.log('Platform:', process.platform);
console.log('Current working directory:', process.cwd());
console.log('');

// Simple function for module usage
function greet(name = 'World') {
  return `Hello, ${name}! Welcome to xmessenger-demos-lp2.`;
}

// Show interactive prompt
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

export {
  greet
};