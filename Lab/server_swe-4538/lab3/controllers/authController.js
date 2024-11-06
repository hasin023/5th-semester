const path = require("path")
const fs = require("fs").promises
const bcrypt = require("bcrypt")
const passport = require("passport")
const initializePassport = require("../config/passport")

const USER_FILE_PATH = path.join(__dirname, "..", "db", "users.json")

class AuthController {
  constructor() {
    this.users = []
    this.loadUsers()
      .then(() => {
        initializePassport(
          passport,
          (email) => this.users.find((user) => user.email === email),
          (id) => this.users.find((user) => user.id === id)
        )
      })
      .catch((error) => {
        console.error("Failed to initialize AuthController:", error)
      })
  }

  async loadUsers() {
    try {
      const data = await fs.readFile(USER_FILE_PATH, "utf8")
      const parsedData = JSON.parse(data)

      if (Array.isArray(parsedData)) {
        this.users = parsedData
      } else {
        this.users = []
      }
    } catch (error) {
      if (error.code === "ENOENT") {
        this.users = []
        await this.saveUsers()
      } else {
        this.users = []
      }
    }
  }

  async saveUsers() {
    try {
      await fs.writeFile(USER_FILE_PATH, JSON.stringify(this.users, null, 2))
    } catch (error) {
      throw new Error("Failed to save user data: " + error.message)
    }
  }

  getLogin = (req, res) => {
    const filePath = path.join(__dirname, "..", "views", "login.html")
    res.sendFile(filePath)
  }

  postLogin = async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Internal server error during login" })
      }

      if (!user) {
        return res
          .status(401)
          .json({ message: info.message || "Invalid email or password" })
      }

      req.logIn(user, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Failed to establish login session" })
        }

        return res.status(200).json({
          message: "Login successful",
          user: { id: user.id, username: user.username },
        })
      })
    })(req, res, next)
  }

  getRegister = (req, res) => {
    const filePath = path.join(__dirname, "..", "views", "register.html")
    res.sendFile(filePath)
  }

  postRegister = async (req, res) => {
    try {
      const { username, email, password } = req.body

      const existingUser = this.users.find((user) => user.email === email)
      if (existingUser) {
        return res
          .status(409)
          .json({ message: "User with this email already exists" })
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password: hashedPassword,
      }

      this.users.push(newUser)
      await this.saveUsers()

      res.status(201).json({ message: "User registered successfully" })
    } catch (error) {
      res.status(500).json({
        message: "An unexpected error occurred during registration",
        error: error.message,
      })
    }
  }

  logout = (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging out" })
      }
      res.status(200).json({ message: "Logged out successfully" })
    })
  }
}

module.exports = new AuthController()
