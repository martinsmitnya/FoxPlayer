const express = require('express');
const app = express();
const mysql = require('mysql');
app.use(express.json());
app.use(express.static('public'));
require('dotenv').config()

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  insecureAuth: process.env.DB_AUTH,
});


app.get('/', (req, res) => {
  res.sendFile(__dirname + 'index.html');
})

app.get('/data', (req, res) => {
  conn.query('SELECT * FROM tracks_table', (err, rows) => {
    if (err) {
      console.log( err );
    } else {
      res.json(rows);
    }

  });
})



app.listen(3000, ()=> { console.log('listening on 3000')})