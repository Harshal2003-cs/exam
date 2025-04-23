const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Serve HTML form
app.get('/', (req, res) => {
  res.send(`
    <h2>Employee Registration Form</h2>
    <form method="POST" action="/register">
      <input name="name" placeholder="Name" /><br/>
      <input name="email" placeholder="Email" /><br/>
      <input name="employeeId" placeholder="Employee ID" /><br/>
      <input name="department" placeholder="Department" /><br/>
      <button type="submit">Register</button>
    </form>
  `);
});

// Handle form submission
app.post('/register', (req, res) => {
  const { name, email, employeeId, department } = req.body;
  let errors = [];

  // Simple validations
  if (!name || name.trim() === '') errors.push('Name is required');
  if (!email || !email.includes('@')) errors.push('Valid email is required');
  if (!employeeId || employeeId.trim() === '') errors.push('Employee ID is required');
  if (!department || department.trim() === '') errors.push('Department is required');

  if (errors.length > 0) {
    res.send(`<h3>Errors:</h3><ul>${errors.map(err => `<li>${err}</li>`).join('')}</ul><a href="/">Go Back</a>`);
  } else {
    res.send(`<h3>Employee Registered Successfully!</h3><p>Name: ${name}</p><p>Email: ${email}</p><p>Employee ID: ${employeeId}</p><p>Department: ${department}</p>`);
  }
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
