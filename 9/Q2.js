const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Extract the requested file path from the URL
  const filePath = path.join(__dirname, req.url);

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File not found, return a 404 error
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 - File Not Found');
      return;
    }

    // Read the file and send its content to the client
    fs.readFile(filePath, (err, data) => {
      if (err) {
        // Something went wrong, return a 500 error
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 - Internal Server Error');
      } else {
        // Determine the content type based on the file extension
        const ext = path.extname(filePath);
        let contentType = 'text/plain';
        switch (ext) {
          case '.html':
            contentType = 'text/html';
            break;
          case '.css':
            contentType = 'text/css';
            break;
          case '.js':
            contentType = 'text/javascript';
            break;
          case '.json':
            contentType = 'application/json';
            break;
          case '.png':
            contentType = 'image/png';
            break;
          case '.jpg':
            contentType = 'image/jpg';
            break;
        }

        // Send the file content with the appropriate content type
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});