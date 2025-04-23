// app.js
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve the HTML page with a download link
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>File Download</title>
    </head>
    <body>
      <h1>Download File</h1>
      <a href="/download">Click here to download the file</a>
    </body>
    </html>
  `);
});

// Route to handle file download
app.get('/download', (req, res) => {
  const filePath = path.join(__dirname, 'e1.txt'); // Path to the file
  const fileName = 'e1.txt'; // Name of the file to be downloaded

  // Set headers to prompt the browser to download the file
  res.download(filePath, fileName, (err) => {
    if (err) {
      console.error('Error downloading file:', err);
      res.status(500).send('Error downloading file');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});