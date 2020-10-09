const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json');

var app = express();
var PORT = process.env.PORT || 6969;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('../Develop/public'));

// GETS

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});
            
app.get("/api/notes", function(req, res) {
    return res.json(db);
});

// POSTS

app.post('/api/notes', function (req, res) {
    const note = req.body;
    console.log('post working', note);
    res.end();
    
});

// DELETES

app.delete('/api/notes/:id', function (req, res) {
    console.log('delete working');
    res.end();
});

app.listen(PORT, function () {
    console.log("PORT: " + PORT);
});