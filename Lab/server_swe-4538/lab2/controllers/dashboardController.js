const pool = require("../config/db")
const formidable = require("formidable")

class DashboardController {
  renderdashboardPage = async (req, res) => {
    const { userInfo } = req // Assuming userInfo contains the logged-in user data

    try {
      // Step 1: Get user-selected tags from the USERTAGS table
      const userTagsQuery = `
            SELECT tag_id 
            FROM USERTAGS 
            WHERE user_id = $1;
        `
      const userTagsResult = await pool.query(userTagsQuery, [userInfo.user_id])

      const userTagIds = userTagsResult.rows.map((tag) => tag.tag_id)

      if (userTagIds.length > 0) {
        // Step 2: Fetch animes that match the selected tags
        const animeQuery = `
                SELECT a.* 
                FROM ANIME a
                JOIN ANIMETAGS at ON a.anime_id = at.anime_id
                WHERE at.tag_id = ANY($1);
            `
        const { rows: animes } = await pool.query(animeQuery, [userTagIds])

        // Step 3: Render the dashboard page with filtered animes
        res.status(200).render("dashboard/index.ejs", {
          title: "Dashboard",
          user: userInfo,
          animes: animes,
        })
      } else {
        // If the user hasn't selected any tags, you may want to show all or none
        res.status(200).render("dashboard/index.ejs", {
          title: "Dashboard",
          user: userInfo,
          animes: [], // No tags selected
        })
      }
    } catch (error) {
      console.error("Error fetching animes based on user tags:", error)
      res.status(500).render("dashboard/error.ejs", {
        status: 500,
        title: "Error",
        message: "Internal server error",
        error: error,
      })
    }
  }

  renderSelectTags = async (req, res) => {
    const { userInfo } = req
    const { tag_ids } = req.body

    try {
      // Insert selected tags into USERTAGS table
      const insertUserTagsQuery = `
            INSERT INTO usertags (user_id, tag_id) VALUES ($1, UNNEST($2::int[]))
            ON CONFLICT DO NOTHING;
        `
      await pool.query(insertUserTagsQuery, [userInfo.id, tag_ids])

      // Update the first_time flag to false
      const updateFirstTimeQuery =
        "UPDATE users SET first_time = false WHERE user_id = $1;"
      await pool.query(updateFirstTimeQuery, [userInfo.id])

      res.redirect("/dashboard")
    } catch (error) {
      console.error("Error saving user tags:", error)
      res.status(500).render("dashboard/error.ejs", {
        status: 500,
        title: "Error",
        message: "Internal server error",
        error: error,
      })
    }
  }

  renderExplorePage = async (req, res) => {
    const { userInfo } = req
    const { tagId } = req.query

    try {
      let animeQuery = `
      SELECT anime.anime_id, anime.anime_name, anime.anime_img, anime.description
      FROM anime
      LEFT JOIN animetags ON anime.anime_id = animetags.anime_id
      WHERE $1::int IS NULL OR animetags.tag_id = $1
      GROUP BY anime.anime_id;
    `
      const { rows: animes } = await pool.query(animeQuery, [tagId || null])

      // Query to fetch all available tags
      const tagQuery = "SELECT * FROM tag;"
      const { rows: tags } = await pool.query(tagQuery)

      res.status(200).render("dashboard/explore.ejs", {
        title: "Explore",
        user: userInfo,
        animes,
        tags,
        selectedTagId: tagId || null, // Keep track of selected tag
      })
    } catch (error) {
      console.error("Error fetching data:", error)
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
