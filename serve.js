// Kleiner Testserver zum Ausprobieren der App-Version.
// Aufruf: node serve.js  →  danach http://localhost:4173 im Browser öffnen.
const http = require('http');
const fs = require('fs');
const path = require('path');

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.webmanifest': 'application/manifest+json', '.json': 'application/json', '.css': 'text/css' };

http.createServer((req, res) => {
  let rel = decodeURIComponent(req.url.split('?')[0]);
  if (rel === '/') rel = '/index.html';
  const file = path.join(__dirname, path.normalize(rel).replace(/^([\\/])+/, ''));
  if (!file.startsWith(__dirname)) { res.writeHead(403).end('verboten'); return; }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('nicht gefunden'); return; }
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' }).end(data);
  });
}).listen(4173, () => console.log('läuft auf http://localhost:4173'));
