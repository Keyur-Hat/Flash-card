
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



app.listen(3308, () => console.log('Server running on port 3308'));