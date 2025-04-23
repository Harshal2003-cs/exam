const http = require('http');
const fs = require('fs');
const path = require('path');

// Create server
const server = http.createServer((req, res) => {
  // Normalize file path (e.g., /file.txt becomes ./file.txt)
  const filePath = '.' + decodeURIComponent(req.url);

  // Prevent directory traversal attacks
  const safePath = path.normalize(filePath).replace(/^(\.\.[\/\\])+/, '');

  fs.readFile(safePath, (err, data) => {
    if (err) {
      // If error occurs (e.g. file doesn't exist), return 404
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else {
      // Otherwise, return file content
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(data);
    }
  });
});

// Listen on port 3000
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
