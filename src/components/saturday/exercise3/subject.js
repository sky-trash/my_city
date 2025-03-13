const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Создание соединения с базой данных
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydb',
});

app.get('/api/users', (req, res) => {
  const { username } = req.query;
  const query = `SELECT * FROM users WHERE username = '${username}'`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error');
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});