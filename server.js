const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4400;

const notes = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})

app.get('/api/notes', (req, res) => {
    return res.json(notes);
})

app.get('/api/notes/:id', (req, res) => {
    const chosen = req.params.id;
    console.log(chosen);
  
    for (let i = 0; i < notes.length; i++) {
      if (chosen === notes[i].id) {
        return res.json(notes[i]);
      }
    }
  
    return res.json(false);
});


app.post("/api/notes", (req, res) => {
    const newNote = req.body;
  
    console.log(newNote);
    notes.push(newNote);
    res.json(notes);

  });

  app.delete('/api/notes/:id', (req, res) => {
    const clicked = req.params.id;

    for (let i = 0; i < notes.length; i++) {
        if (clicked === notes[i].id) {
          notes.splice(i, 1);
          console.log(notes);

        }
      }
    //console.log(req.params.id);

  });

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });
  