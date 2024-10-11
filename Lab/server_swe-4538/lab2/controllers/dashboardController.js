const pool = require("../config/db")
const formidable = require("formidable")

class DashboardController {
  renderdashboardPage = (req, res) => {
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

  renderAnimePage = async (req, res) => {
    const { userInfo } = req
    const { id } = req.params

    try {
      // Fetch the anime details
      const animeQuery = "SELECT * FROM anime WHERE anime_id = $1;"
      const { rows: animeRows } = await pool.query(animeQuery, [id])

      if (animeRows.length === 0) {
        return res.status(404).render("dashboard/error.ejs", {
          status: 404,
          title: "Not Found",
          message: "Anime not found",
        })
      }

      const anime = animeRows[0]

      // Fetch the user's watchlist entry for this anime
      const watchlistQuery = `
      SELECT * FROM watchlist 
      WHERE user_id = $1 AND anime_id = $2;
    `
      const { rows: watchlistRows } = await pool.query(watchlistQuery, [
        userInfo.id,
        id,
      ])
      const userWatchlist = watchlistRows[0] || null

      // Fetch the reviews for this anime
      const reviewsQuery = `
      SELECT r.rating, r.review_text, u.email 
      FROM review r
      JOIN users u ON r.user_id = u.user_id
      WHERE r.anime_id = $1;
    `
      const { rows: reviews } = await pool.query(reviewsQuery, [id])

      res.status(200).render("dashboard/anime.ejs", {
        title: anime.anime_name,
        user: userInfo,
        anime,
        userWatchlist,
        reviews,
      })
    } catch (error) {
      console.error("Error fetching anime:", error)
      res.status(500).render("dashboard/error.ejs", {
        status: 500,
        title: "Error",
        message: "Internal server error",
        error: error,
      })
    }
  }

  addAnimeToWatchList = async (req, res) => {
    const { userInfo } = req
    const { anime_id } = req.body

    try {
      const watchlistQuery = `
      INSERT INTO watchlist (user_id, anime_id, status, added_date)
      VALUES ($1, $2, 'watch-later', NOW());
    `
      await pool.query(watchlistQuery, [userInfo.id, anime_id])

      return res.status(200).redirect(`/animes/${anime_id}`)
    } catch (error) {
      console.error("Error adding anime to watchlist:", error)
      return res.status(500).render("dashboard/error.ejs", {
        status: 500,
        title: "Error",
        message: "Internal server error",
        error: error,
      })
    }
  }

  renderWatchListPage = async (req, res) => {
    const { userInfo } = req

    try {
      const watchListQuery = `
      SELECT a.ANIME_NAME, a.ANIME_IMG, w.STATUS, w.ADDED_DATE
      FROM WATCHLIST w
      JOIN ANIME a ON w.ANIME_ID = a.ANIME_ID
      WHERE w.USER_ID = $1
    `
      const watchListResult = await pool.query(watchListQuery, [userInfo.id])

      res.status(200).render("dashboard/watch-list.ejs", {
        title: "Watch List",
        user: userInfo,
        watchlist: watchListResult.rows,
      })
    } catch (err) {
      console.error("Error fetching watchlist:", err)
      res.status(500).send("Internal Server Error")
    }
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
