const router = require("express").Router()
const dashboardController = require("../controllers/dashboardController")
const authMiddleware = require("../middleware/authMiddleware")

router.get(
  "/dashboard",
  authMiddleware,
  dashboardController.renderDashboardPage
)

router.post(
  "/dashboard/selectTags",
  authMiddleware,
  dashboardController.renderSelectTags
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
  "/watch-list/update-status",
  authMiddleware,
  dashboardController.updateWatchListStatus
)

router.post(
  "/watch-list/remove",
  authMiddleware,
  dashboardController.removeAnimeFromWatchList
)

router.post("/review/add", authMiddleware, dashboardController.addReview)

module.exports = router
