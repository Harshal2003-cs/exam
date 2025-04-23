// app.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>String Concatenation</title>
    </head>
    <body>
      <h1>String Concatenation</h1>
      <form action="/concatenate" method="POST">
        <label for="string1">String 1:</label>
        <input type="text" id="string1" name="string1" required>
        <br><br>
        <label for="string2">String 2:</label>
        <input type="text" id="string2" name="string2" required>
        <br><br>
        <button type="submit">Concatenate</button>
      </form>
    </body>
    </html>
  `);
});

// Handle form submission
app.post('/concatenate', (req, res) => {
  const { string1, string2 } = req.body;
  const result = string1 + ' ' + string2; // Concatenate the strings
  res.send(`<h1>Result:</h1><p>${result}</p>`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});