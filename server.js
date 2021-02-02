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

app.delete('/playlists/:id', (req, res) => {
  conn.query('SELECT * FROM playLists_table WHERE listId = (?);', [req.params.id], (err, selectedRows) => {
    if (err) {
      res.status(500).json({error: 'Internal database error'});
    } else {
      //DELETE playList with listId

      conn.query('DELETE FROM playLists_table WHERE listId = (?);', [req.params.id], (err, rows) => {
        if (err) {
          res.status(500).json({error: 'Internal database error'});
        } else {
          if (!req.params.id) {
            res.status(500).json({error: 'No id was given'});
          } else if (selectedRows.length < 1) {
            res.status(404).json({error: 'This playlist does not exists'});
          } else if (selectedRows[0].systems === 1) {
            res.status(200).json({error: 'This playlist can not be deleted'});
          } else {
            res.status(200).json('DELETED: '+ selectedRows[0]);
          }
        }
      });
      //DELETE playList with listId

    }
  })
 
})



app.listen(3000, ()=> { console.log('listening on 3000')})