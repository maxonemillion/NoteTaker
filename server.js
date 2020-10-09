const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');

var app = express();
var PORT = process.env.PORT || 6969;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));

// GET

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});
            
app.get("/api/notes", function(req, res) {
    return res.json(db);
});

// POST

app.post('/api/notes', function (req, res) {
    const note = req.body;
    note.id = uuidv4();
    console.log('post working', note);
    db.push(note);
    fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), JSON.stringify(db));
    res.json(note);
});

// DELETE

app.delete('/api/notes/:id', function (req, res) {
    const exnote = req.params.id;
    console.log('delete working', exnote);
    db = db.filter((note) => note.id !== req.params.id);
    fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), JSON.stringify(db));
    res.json({ok:true});
});

app.listen(PORT, function () {
    console.log("PORT: " + PORT);
});