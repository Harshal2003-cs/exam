const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML Form
app.get('/', (req, res) => {
    res.send(`
      <h2>Append File Content</h2>
      <form action="/append" method="POST">
        <label>First File Name:</label><br>
        <input type="text" name="file1" placeholder="file1.txt" required><br><br>
  
        <label>Second File Name:</label><br>
        <input type="text" name="file2" placeholder="file2.txt" required><br><br>
  
        <button type="submit">Append Content</button>
      </form>
    `);
  });
// Handle Form Submission
app.post('/append', (req, res) => {
  const file1 = path.join(__dirname, 'files', req.body.file1);
  const file2 = path.join(__dirname, 'files', req.body.file2);

  // Read content of first file
  fs.readFile(file1, 'utf8', (err, data) => {
    if (err) {
      return res.send(`Error reading first file: ${err.message}`);
    }

    // Append content to second file
    fs.appendFile(file2, data, (err) => {
      if (err) {
        return res.send(`Error appending to second file: ${err.message}`);
      }

      res.send(`<p>✅ Content from <strong>${req.body.file1}</strong> appended to <strong>${req.body.file2}</strong>.</p><a href="/">Back</a>`);
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
