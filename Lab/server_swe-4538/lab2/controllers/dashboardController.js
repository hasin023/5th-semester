const pool = require("../config/db")
const formidable = require("formidable")

class DashboardController {
  dashboardPage = (req, res) => {
    const { userInfo } = req

    res.status(200).render("dashboard/index.ejs", {
      title: "Dashboard",
      user: userInfo,
    })
  }

  renderExplorePage = async (req, res) => {
    const { userInfo } = req

    try {
      const animeQuery = "select * from anime;"
      const { rows } = await pool.query(animeQuery)

      res.status(200).render("dashboard/explore.ejs", {
        title: "Explore",
        user: userInfo,
        animes: rows,
      })
    } catch (error) {
      console.error("Error fetching animes:", error)
      res.status(500).render("dashboard/error.ejs", {
        status: 500,
        title: "Error",
        message: "Internal server error",
        error: error,
      })
    }
  }

  renderWatchListPage = (req, res) => {
    const { userInfo } = req

    res.status(200).render("dashboard/watch-list.ejs", {
      title: "Watch List",
      user: userInfo,
    })
  }

  addReview = async (req, res) => {
    const { userInfo } = req
    const form = new formidable.IncomingForm()

    try {
      const { fields } = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields) => {
          if (err) {
            reject(err)
          } else {
            resolve({ fields })
          }
        })
      })

      console.log(fields)

      return res.status(200).redirect("/explore")
    } catch (error) {
      return res.status(500).render("dashboard/error.ejs", {
        status: 500,
        title: "Error",
        message: "Internal server error",
        error: error,
      })
    }
  }

  updateReview = async (req, res) => {
    const { userInfo } = req
    const { review_id } = req.params

    const form = new formidable.IncomingForm()

    try {
      const { fields } = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields) => {
          if (err) {
            reject(err)
          } else {
            resolve({ fields })
          }
        })
      })

      console.log(fields)

      return res.status(200).redirect(`/reviews/${review_id}`)
    } catch (error) {
      return res.status(500).render("dashboard/error.ejs", {
        status: 500,
        title: "Error",
        message: "Internal server error",
        error: error,
      })
    }
  }
}

module.exports = new DashboardController()
