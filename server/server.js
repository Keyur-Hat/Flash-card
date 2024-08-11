
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'keyur@sql',
    database: 'flashcard_db'
})

db.connect((err) => {
    if(err) throw err;
    console.log('MySql Connected...');
});



app.get('/',(re,res)=>{
    return res.send('Hello World')
})

app.get('/api/flashcards', (req, res) => {
    const query = 'SELECT * FROM flashcards';
    db.query(query, (err, result) => {
        if(err) {
            console.error('Error fetching flashcards:', err);
            res.status(500).send('Error fetching flashcards');
          } else {
            res.send(result);
          }
    });
})

app.post('/api/flashcards', (req, res) => {
    const { question, answer } = req.body;
    const query = 'INSERT INTO flashcards (question, answer) VALUES (?,?)';
    db.query(query, [question, answer], (err, result) => {
        if(err) {
            console.error('Error inserting flashcard:', err);
            res.status(500).send('Error inserting flashcard');
          } else {
            res.send("Flashcard inserted successfully");
          }
    });
})

app.put('/api/flashcards/:id', (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    const query = 'UPDATE flashcards SET question=?, answer=? WHERE id=?';
    db.query(query, [question, answer, id], (err, result) => {
        if(err) {
            console.error('Error updating flashcard:', err);
            res.status(500).send('Error updating flashcard');
          } else {
            res.send("Flashcard updated successfully");
          }
    });
 
})

app.delete('/api/flashcards/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM flashcards WHERE id=?';
    db.query(query, [id], (err, result) => {
        if(err) {
            console.error('Error deleting flashcard:', err);
            res.status(500).send('Error deleting flashcard');
          } else {
            res.send('Flashcard deleted successfully');
          }
    });
    
})



app.listen(3308, () => console.log('Server running on port 3308'));