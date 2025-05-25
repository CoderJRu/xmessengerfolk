import fs from 'fs'
import path from 'path'

// Create dist directory
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

// Copy main server file
fs.copyFileSync('index.js', 'dist/index.js')

// Copy all JS files in root
const jsFiles = ['demosInstance.js', 'matheFunc.js', 'names.js', 'deploy.js']
jsFiles.forEach(file => {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, `dist/${file}`)
  }
})

// Copy public directory
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }
  
  const items = fs.readdirSync(src)
  items.forEach(item => {
    const srcPath = path.join(src, item)
    const destPath = path.join(dest, item)
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  })
}

copyDir('public', 'dist/public')

// Create package.json for deployment
const deployPackage = {
  "name": "xmessenger-demos",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "@kynesyslabs/demosdk": "^2.2.44",
    "@supabase/supabase-js": "^2.49.8",
    "express": "^4.21.2",
    "cors": "^2.8.5"
  }
}

fs.writeFileSync('dist/package.json', JSON.stringify(deployPackage, null, 2))

console.log('Build completed successfully! 🎉')
console.log('Your Node.js app is ready for deployment in the dist folder.')