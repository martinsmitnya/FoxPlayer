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

conn.connect((err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('Connceted to: ' + process.env.DB_DATABASE + ' database');
  }
})


app.get('/', (req, res) => {
  res.sendFile(__dirname + 'index.html');
})

//PlayLists      PlayLists      PlayLists      PlayLists      PlayLists
app.get('/playlists', (req, res) => {
  conn.query('SELECT * FROM playLists_table;', (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Internal database error' });
    } else {
      res.json(rows);
    }
  })
});

app.post('/playlists', (req, res) => {
  conn.query('INSERT INTO playLists_table (title) VALUES (?);', [req.body.title], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Internal database error' });
    } else {
      conn.query('SELECT * FROM playLists_table ORDER BY listId ASC', (err, rows) => {
        if (err) {
          res.status(500).json({ error: 'Internal database error' });
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
      res.status(500).json({ error: 'Internal database error' });
    } else {
      conn.query('DELETE FROM playLists_table WHERE listId = (?);', [req.params.id], (err, rows) => {
        if (err) {
          res.status(500).json({ error: 'Internal database error' });
        } else {
          if (!req.params.id) {
            res.status(500).json({ error: 'No id was given' });
          } else if (selectedRows.length < 1) {
            res.status(404).json({ error: 'This playlist does not exists' });
          } else if (selectedRows[0].systems === 1) {
            res.status(200).json({ error: 'This playlist can not be deleted' });
          } else {
            res.status(200).json('DELETED: ' + selectedRows[0]);
          }
        }
      })
    }
  })
});

//Tracks      Tracks      Tracks      Tracks       Tracks      Tracks
app.get('/playlist-tracks', (req, res) => {
  conn.query('SELECT * FROM tracks_table;', (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Internal database error' });
    } else {
      res.json(rows);
    }
  })
});

app.get('/playlist-tracks/:playlist_id', (req, res) => {
  conn.query('SELECT * FROM playLists_table WHERE listId = (?);', [req.params.playlist_id], (err, playLists) => {
    if (playLists.length < 1) {
      res.status(404).json({ error: 'There is no such playlist' });
    } else if (err) {
      res.status(500).json({ error: 'Internal database error' });
    } else {
      conn.query('SELECT * FROM tracks_table WHERE playlist = (?);', [req.params.playlist_id], (err, rows) => {
        if (err) {
          res.status(500).json({ error: 'Internal database error' });
        } else {
          res.json(rows);
        }
      })
    }
  })
});

app.post('/playlist-tracks/:playlist_id/:track_id', (req, res) => {
  conn.query('SELECT * FROM playLists_table WHERE listId = (?);', [req.params.playlist_id], (err, playLists) => {
    if (playLists.length < 1) {
      res.status(404).json({ error: 'No such playlist' });
    } else if (err) {
      res.status(500).json({ error: 'Internal database error' });
    } else {
      conn.query('SELECT * FROM tracks_table WHERE trackId = (?);', [req.params.track_id], (err, tracks) => {
        if (tracks.length < 1) {
          res.status(404).json({ error: 'No such track' });
        } else if (err) {
          res.status(500).json({ error: 'Internal database error' });
        } else if (tracks[0].playlist === Number(req.params.playlist_id)) {
          res.status(406).json({ error: 'Already added this track' });
        } else {
          conn.query('UPDATE tracks_table SET playlist = (?) WHERE trackId = (?);', [req.params.playlist_id, req.params.track_id], (err, rows) => {
            if (err) {
              res.status(500).json({ error: 'Internal database error' });
            } else {
              res.json({ response: 'Inserted' });
            }
          })
        }
      })
    }
  })
});

app.delete('/playlist-tracks/:playlist_id/:track_id', (req, res) => {
  conn.query('SELECT * FROM playLists_table WHERE listId = (?);', [req.params.playlist_id], (err, playLists) => {
    if (playLists.length < 1) {
      res.status(404).json({ error: 'No such playlist' });
    } else if (err) {
      res.status(500).json({ error: 'Internal database error' });
    } else {
      conn.query('SELECT * FROM tracks_table WHERE trackId = (?);', [req.params.track_id], (err, tracks) => {
        if (tracks.length < 1) {
          res.status(404).json({ error: 'No such track' });
        } else if (err) {
          res.status(500).json({ error: 'Internal database error' });
        } else {
          //UPDATE TRACK playlist asignement to null
          conn.query('UPDATE tracks_table SET playlist = null WHERE trackId = (?);', [req.params.track_id], (err, rows) => {
            if (err) {
              res.status(500).json({ error: 'Internal database error' });
            } else {
              res.json({response: 'Delisted'});
            }
          })
        }
      })
    }
  })
});

app.listen(3000, () => { console.log('listening on 3000') })