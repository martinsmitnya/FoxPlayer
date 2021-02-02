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

conn.connect( (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('Connceted to: ' + process.env.DB_DATABASE + ' database' );
  }
})


app.get('/', (req, res) => {
  res.sendFile(__dirname + 'index.html');
})

app.get('/playlists', (req, res) => {
  conn.query('SELECT * FROM playLists_table;', (err, rows) => {
    if (err) {
      res.status(500).json({error: 'Internal database error'});
    } else {
      res.json(rows);
    }

  });
})

app.post('/playlists', (req, res) => {
  conn.query('INSERT INTO playLists_table (title) VALUES (?);', [req.body.title], (err, rows) => {
    if (err) {
      res.status(500).json({error: 'Internal database error'});
    } else {

      conn.query('SELECT * FROM playLists_table ORDER BY listId ASC', (err, rows) => {
        if (err) {
          res.status(500).json({error: 'Internal database error'});
        } else {
          res.json(rows);
        }
      })

    }

  })
});



app.listen(3000, ()=> { console.log('listening on 3000')})