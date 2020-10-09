const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4400;

let notes = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public/assets')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})

app.get('/api/notes', (req, res) => {
    return res.json(notes);
})


app.post("/api/notes", (req, res) => {
    const newNote = req.body;
  
    console.log(newNote);
    notes.push(newNote);
    res.json(notes);

  });

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });
  