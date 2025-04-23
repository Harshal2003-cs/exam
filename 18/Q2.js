// app.js
const { Client } = require('pg');

// Database connection configuration
const client = new Client({
  user: 'postgres', // Replace with your PostgreSQL username
  host: 'localhost', // Replace with your database host
  database: 'school', // Replace with your database name
  password: 'tybcs', // Replace with your PostgreSQL password
  port: 5432, // Default PostgreSQL port
});

// Connect to the PostgreSQL database
client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');

    // Query to select customers whose name starts with 'A'
    const query = `
      SELECT * FROM customers
      WHERE name LIKE 'A%'
    `;

    // Execute the query
    return client.query(query);
  })
  .then((result) => {
    // Display the results on the console
    console.log('Customers whose name starts with "A":');
    console.table(result.rows); // Display results in a table format
  })
  .catch((err) => {
    console.error('Error:', err);
  })
  .finally(() => {
    // Close the connection
    client.end();
    console.log('Connection closed');
  });