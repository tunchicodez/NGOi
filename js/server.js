const http = require('http');
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const port = process.env.PORT || 8000;

// MIME types for different file extensions
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

/**
 * Send file to client with appropriate headers
 */
function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mime[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>404 - File Not Found</h1><p>The requested file could not be found.</p>');
      return;
    }

    // Use conservative caching for HTML (no cache) and allow longer caching for static assets
    const headers = {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    };
    if (ext === '.html') {
      headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
    } else {
      headers['Cache-Control'] = 'public, max-age=3600';
    }

    res.writeHead(200, headers);
    res.end(data);
  });
}

/**
 * Create HTTP server
 */
const server = http.createServer((req, res) => {
  try {
    // Decode URL and remove query parameters
    let reqPath = decodeURIComponent(req.url.split('?')[0]);

    // Default to Home.html for root path
    if (reqPath === '/' || reqPath === '') {
      reqPath = '/Home.html';
    }

    // Prevent path traversal attacks
    const safePath = path.normalize(path.join(root, reqPath));
    if (!safePath.startsWith(root)) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Bad request');
      return;
    }

    // If path points to a directory, try index.html or Home.html
    if (fs.existsSync(safePath)) {
      const stat = fs.statSync(safePath);
      if (stat.isDirectory()) {
        const indexPath = path.join(safePath, 'index.html');
        const homePath = path.join(safePath, 'Home.html');
        if (fs.existsSync(indexPath)) {
          sendFile(res, indexPath);
          return;
        } else if (fs.existsSync(homePath)) {
          sendFile(res, homePath);
          return;
        }
      } else if (stat.isFile()) {
        sendFile(res, safePath);
        return;
      }
    }

    // Try adding .html extension (allow serving URLs without .html)
    const htmlPath = safePath + '.html';
    if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).isFile()) {
      sendFile(res, htmlPath);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>404 - Page Not Found</h1><p>The requested page could not be found.</p>');
    }
  } catch (err) {
    console.error('Server error:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal server error');
  }
});

/**
 * Start server
 */
server.listen(port, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║  Annor Yeboah Care Foundation - Development Server        ║
╠════════════════════════════════════════════════════════════╣
║  Server running at: http://localhost:${port}
║  Root directory: ${root}
║  Press Ctrl+C to stop the server
╚════════════════════════════════════════════════════════════╝
  `);
});

/**
 * Handle server errors
 */
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Try a different port.`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
  }
});

/**
 * Graceful shutdown
 */
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  server.close(() => {
    console.log('Server stopped.');
    process.exit(0);
  });
});
