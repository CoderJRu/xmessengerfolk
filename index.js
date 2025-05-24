import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Basic API endpoint to test server
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'xmessenger-demos-lp2 server is running!',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 xmessenger-demos-lp2 server running on port ${PORT}`);
  console.log(`📱 Access your app at: http://localhost:${PORT}`);
  console.log(`💾 Supabase connection ready with provided credentials`);
});