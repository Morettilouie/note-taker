const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();

// routes http requests for assets among files
app.use(express.static('public'));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(db);
});

app.post('/api/notes', (req, res) => {
    db.push(req.body);
    fs.writeFile('./db/db.json', JSON.stringify(db), err => {
        if (err) {
            console.log(err)
        }
        res.json(db);
    });
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});