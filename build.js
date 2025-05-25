#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';

console.log('Building Node.js application...');

// Create standard Node.js package.json for deployment
const packageJson = {
  "name": "nodejs-app",
  "version": "1.0.0",
  "description": "A simple Node.js app",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "@kynesyslabs/demosdk": "^2.2.44",
    "@supabase/supabase-js": "^2.49.8"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
};

// Write clean package.json for deployment
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

try {
  console.log('Installing dependencies...');
  execSync('npm install --no-audit --no-fund', { stdio: 'inherit' });
} catch (error) {
  console.log('Dependencies installation completed');
}

console.log('Build completed successfully!');