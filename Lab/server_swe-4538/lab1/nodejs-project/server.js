const express = require("express");
const path = require("path");

// INITIALIZE EXPRESS APP
const app = express();
const PORT = 5000;

// STATIC DIRECTORIES
app.use(express.static('public'));


// ROUTES
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'root.html'));
});

app.get('/manga', (req, res) => {
  res.sendFile(path.join(__dirname, 'manga.html'));
})

app.get("/anime", (req,res) => {
  res.sendFile(path.join(__dirname, 'anime.html'))
})


// LISTEN TO PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

