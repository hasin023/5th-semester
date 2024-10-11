const router = require("express").Router()
const dashboardController = require("../controllers/dashboardController")
const authMiddleware = require("../middleware/authMiddleware")

router.get(
  "/dashboard",
  authMiddleware,
  dashboardController.renderdashboardPage
)
router.get("/explore", authMiddleware, dashboardController.renderExplorePage)
router.get(
  "/watch-list",
  authMiddleware,
  dashboardController.renderWatchListPage
)

module.exports = router
