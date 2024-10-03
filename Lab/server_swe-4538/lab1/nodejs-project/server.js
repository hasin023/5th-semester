require("dotenv").config()

const express = require("express")
const path = require("path")
const cors = require("cors")

// INITIALIZE EXPRESS APP
const app = express()
const PORT = process.env.URL_PORT || 5000

// MIDDLEWARE
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// STATIC DIRECTORIES
app.use(express.static("public"))

// ROUTES
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "root.html"))
})

app.get("/manga", (req, res) => {
  res.sendFile(path.join(__dirname, "manga.html"))
})

app.get("/anime", (req, res) => {
  res.sendFile(path.join(__dirname, "anime.html"))
})

app.post("/submit", (req, res) => {
  const { name, email } = req.body

  res.send(`Name: ${name}, Email: ${email}`)
})

app.post("/update/:id", (req, res) => {
  const { id } = req.params

  res.send(` User ID: ${id} `)
})

// LISTEN TO PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
