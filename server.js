const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 4400;
let notes;

fs.readFile(path.join(__dirname, "/public/db/notes.json"), (err, data) => {
    notes = JSON.parse(data);
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));



app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/db/notes.json"));
});

app.get('/api/notes/:id', (req, res) => {
    const chosen = req.params.id;

    for (let i = 0; i < notes.length; i++) {
      if (chosen === notes[i].id) {
        return res.json(notes[i]);
      }
    }
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
})



app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    notes.push(newNote);
    fs.writeFile(path.join(__dirname, "/public/db/notes.json") , JSON.stringify(notes, null, 5), (err) => {
        if (err) throw err;
    })
    res.json(notes);

  });

  app.delete('/api/notes/:id', (req, res) => {
    const clicked = req.params.id;

    notes.forEach(note => {
        if (clicked === note.id) {
            console.log(clicked + ' deleted');
            let index = notes.indexOf(note);
            notes.splice(index, 1);
            fs.writeFile(path.join(__dirname, "/public/db/notes.json") , JSON.stringify(notes, null, 5), (err) => {
                if (err) throw err;
            })
            res.sendFile(path.join(__dirname, "/public/notes.html"));

        };
    });
  });



app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });
  