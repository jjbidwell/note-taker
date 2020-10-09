const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4400;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.end('<h1>Home Page</h1>');
})

app.get('/notes', (req, res) => {
    res.end('<h1>Note Page</h1>');
})

app.get('/api/notes', (req, res) => {
    res.end('<h1>API note Page</h1>');
})


app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });
  