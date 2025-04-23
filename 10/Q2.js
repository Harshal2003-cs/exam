// server.js
const http = require('http');
const getCurrentDateTime = require('./modules'); // Import the custom module

// Create a server
const server = http.createServer((req, res) => {
  // Set the response header
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Get the current date and time using the custom module
  const currentDateTime = getCurrentDateTime();

  // Send the response
  res.end(`Current Date and Time: ${currentDateTime}`);
});

// Define the port to listen on
const port = 3000;

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});