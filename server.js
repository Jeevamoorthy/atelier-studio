/**
 * ATELIER STUDIO // STANDALONE NODE & API BACKEND SERVER
 * Serves the static white theme frontend and connects all database API endpoints.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const googleAuthHandler = require('./api/auth/google');
const ordersHandler = require('./api/orders');

const PORT = process.env.PORT || 8080;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Helper to parse JSON body
  function parseBody(callback) {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      req.body = body;
      try {
        if (body && req.headers['content-type']?.includes('application/json')) {
          req.body = JSON.parse(body);
        }
      } catch (e) {}
      callback();
    });
  }

  // 1. API Route: Google Authentication
  if (pathname === '/api/auth/google') {
    parseBody(() => {
      googleAuthHandler(req, res);
    });
    return;
  }

  // 2. API Route: Orders & Escrow
  if (pathname === '/api/orders' || pathname.startsWith('/api/orders/')) {
    parseBody(() => {
      ordersHandler(req, res);
    });
    return;
  }

  // 3. Static Files
  let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);
  const ext = path.extname(filePath).toLowerCase();

  // If path doesn't have an extension, try adding .html
  if (!ext && !fs.existsSync(filePath)) {
    filePath += '.html';
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end('<h1>404 Not Found</h1>');
      return;
    }

    const contentType = MIME_TYPES[path.extname(filePath)] || 'application/octet-stream';
    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[Atelier Studio] Backend & Server running at http://localhost:${PORT}`);
  console.log(`[Atelier Studio] Database initialized at ./data/database.json`);
});
