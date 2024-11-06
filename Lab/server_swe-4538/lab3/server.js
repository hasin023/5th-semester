require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors")
const path = require("path")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const passport = require("passport")

// PORT
const PORT = process.env.APP_PORT || 8000

// Routes
const authRouter = require("./routes/authRoute")
const authMiddleware = require("./middleware/authMiddleware")

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
// Session
app.use(
  session({
    secret: "randomsecret2345voice55",
    resave: false,
    saveUninitialized: false,
  })
)
app.use(passport.initialize())
app.use(passport.session())

// Static Files
app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "views")))

// Use Routes
app.use("/", authRouter)

app.get("/", authMiddleware, (req, res) => {
  res.sendFile(__dirname + "/views/homePage.html")
})

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
