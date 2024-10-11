const router = require("express").Router()
const dashboardController = require("../controllers/dashboardController")
const authMiddleware = require("../middleware/authMiddleware")

router.get(
  "/dashboard",
  authMiddleware,
  dashboardController.renderDashboardPage
)
router.get("/explore", authMiddleware, dashboardController.renderExplorePage)
router.get("/animes/:id", authMiddleware, dashboardController.renderAnimePage)

router.get(
  "/watch-list",
  authMiddleware,
  dashboardController.renderWatchListPage
)

router.post(
  "/watch-list/add",
  authMiddleware,
  dashboardController.addAnimeToWatchList
)

router.post(
  "/dashboard/selectTags",
  authMiddleware,
  dashboardController.renderSelectTags
)

module.exports = router
