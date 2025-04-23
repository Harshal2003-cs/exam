const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret_key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Dummy users
const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
];

// Dummy courses
const courses = [
    { id: 1, title: 'HTML Basics', description: 'Learn HTML from scratch' },
    { id: 2, title: 'JavaScript Essentials', description: 'Introduction to JS' },
    { id: 3, title: 'Node.js 101', description: 'Backend with Node' }
];

// Passport setup
passport.use(new LocalStrategy((username, password, done) => {
    const user = users.find(u => u.username === username && u.password === password);
    return user ? done(null, user) : done(null, false, { message: 'Incorrect credentials' });
}));
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    done(null, user);
});

// Middleware to protect routes
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}

// Routes

app.get('/', (req, res) => {
    res.send(`
        <h2>Welcome to the eLearning system</h2>
        <a href="/login">Login</a>
    `);
});

app.get('/login', (req, res) => {
    res.send(`
        <h2>Login</h2>
        <form method="POST" action="/login">
            <input type="text" name="username" placeholder="Username" required /><br/>
            <input type="password" name="password" placeholder="Password" required /><br/>
            <button type="submit">Login</button>
        </form>
    `);
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login'
}));

app.get('/profile', ensureAuthenticated, (req, res) => {
    res.send(`
        <h2>Hello, ${req.user.username}!</h2>
        <p><a href="/content/home">Home</a> | 
           <a href="/content/courses">Courses</a> | 
           <a href="/logout">Logout</a>
        </p>
    `);
});

app.get('/content/home', ensureAuthenticated, (req, res) => {
    res.send(`
        <h2>Home</h2>
        <p>Welcome to your learning dashboard, ${req.user.username}!</p>
        <p><a href="/profile">Back to Profile</a></p>
    `);
});

app.get('/content/courses', ensureAuthenticated, (req, res) => {
    let courseList = courses.map(c => `<li><strong>${c.title}</strong>: ${c.description}</li>`).join('');
    res.send(`
        <h2>Courses</h2>
        <ul>${courseList}</ul>
        <p><a href="/profile">Back to Profile</a></p>
    `);
});

app.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) return next(err);
        res.redirect('/');
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
