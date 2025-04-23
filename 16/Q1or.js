const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// PostgreSQL connection setup
const pool = new Pool({
    user: 'postgres', // Change to your PostgreSQL user
    host: 'localhost',
    database: 'school', // Change to your database name
    password: 'tybcs', // Change to your password
    port: 5432,
});

app.use(bodyParser.json());

// Create table if not exists and insert sample data
pool.query(`
    CREATE TABLE IF NOT EXISTS recipes (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        ingredients TEXT NOT NULL,
        instructions TEXT NOT NULL
    );

    INSERT INTO recipes (name, ingredients, instructions) VALUES
    ('Pasta', 'Pasta, Tomato Sauce, Olive Oil, Garlic', 'Boil pasta, prepare sauce, mix and serve'),
    ('Pancakes', 'Flour, Milk, Eggs, Sugar, Baking Powder', 'Mix ingredients, cook on a pan, serve with syrup')
    ON CONFLICT DO NOTHING;
`, (err) => {
    if (err) console.error('Error creating table or inserting data:', err);
});

// Get all recipes
app.get('/recipes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM recipes');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Add a new recipe
app.post('/recipes', async (req, res) => {
    const { name, ingredients, instructions } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO recipes (name, ingredients, instructions) VALUES ($1, $2, $3) RETURNING *',
            [name, ingredients, instructions]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Recipe Book API running on http://localhost:${port}`);
});
