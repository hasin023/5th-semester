const authMiddleware = async (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    return res.status(401).json("You are not Authenticated")
  }
}

module.exports = authMiddleware
