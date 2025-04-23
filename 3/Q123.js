// server.js
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: 'your-secret-key', // Change this to a secure key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// In-memory "database" for users
const users = [];

// Serve the login form
app.get('/', (req, res) => {
  res.send(`
    <h1>Login</h1>
    <form action="/login" method="POST">
      <input type="text" name="username" placeholder="Username" required>
      <input type="password" name="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
    <a href="/register">Register</a>
  `);
});

// Serve the registration form
app.get('/register', (req, res) => {
  res.send(`
    <h1>Register</h1>
    <form action="/register" method="POST">
      <input type="text" name="username" placeholder="Username" required>
      <input type="password" name="password" placeholder="Password" required>
      <button type="submit">Register</button>
    </form>
    <a href="/">Login</a>
  `);
});

// Handle registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check if the user already exists
  if (users.find((user) => user.username === username)) {
    return res.status(400).send('User already exists.');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the user to the "database"
  users.push({ username, password: hashedPassword });
  res.send('Registration successful! <a href="/">Login</a>');
});

// Handle login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find the user in the "database"
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(400).send('Invalid username or password.');
  }

  // Compare the password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).send('Invalid username or password.');
  }

  // Set session data
  req.session.user = user;
  res.send(`Login successful! Welcome, ${user.username}. <a href="/logout">Logout</a>`);
});

// Handle logout
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error logging out.');
    }
    res.redirect('/');
  });
});

// Protected route
app.get('/profile', (req, res) => {
  if (!req.session.user) {
    return res.status(401).send('Unauthorized. Please <a href="/">login</a>.');
  }
  res.send(`Welcome to your profile, ${req.session.user.username}! <a href="/logout">Logout</a>`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});