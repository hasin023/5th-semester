require("dotenv").config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require("path")
const session = require("express-session")
const cookieParser = require("cookie-parser")

// PORT
const PORT = process.env.APP_PORT || 5000

// Routes
const authRouter = require("./Routes/authRoute")
const dashboardRouter = require("./Routes/dashboardRoute")
const authMiddleware = require("./middleware/authMiddleware")

// Middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
// Session
app.use(
  session({
    secret: "randomsecret2345voice55",
    resave: true,
    saveUninitialized: true,
  })
)

// Set Views
app.set("views", "./views")
app.set("view engine", "ejs")

// Static Files
app.use(express.static(path.join(__dirname, "dist")))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "views")))

// Use Routes
app.use("/", authRouter)
app.use("/", dashboardRouter)

app.get("/", authMiddleware, (req, res) => {
  const { userInfo } = req

  return res.render("root.ejs", {
    title: "Home Page",
    user: userInfo,
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
