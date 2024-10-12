const pool = require("../config/db")
const formidable = require("formidable")

class DashboardController {
  renderDashboardPage = async (req, res) => {
    const { userInfo } = req // Assuming userInfo contains the logged-in user data

    try {
      // Step 1: Get user-selected tags from the USERTAGS table
      const userTagsQuery = `
            SELECT tag_id 
            FROM USERTAGS 
            WHERE user_id = $1;
        `
      const userTagsResult = await pool.query(userTagsQuery, [userInfo.id])

      const userTagIds = userTagsResult.rows.map((tag) => tag.tag_id)

      if (userTagIds.length > 0) {
        // Step 2: Fetch unique animes that match the selected tags
        const animeQuery = `
                SELECT DISTINCT a.* 
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
        // If the user hasn't selected any tags, show an empty array
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
      SELECT r.rating, r.review_text, u.username 
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

  updateWatchListStatus = async (req, res) => {
    const { animeId, userId, newStatus } = req.body
    const { userInfo } = req

    if (userInfo.id != userId) {
      return res.status(403).send("Unauthorized")
    }

    try {
      const updateQuery = `
      UPDATE WATCHLIST
      SET STATUS = $1
      WHERE anime_id = $2 AND user_id = $3;
    `

      await pool.query(updateQuery, [newStatus, animeId, userId])
      res.redirect("/watch-list")
    } catch (error) {
      console.error("Error updating watchlist status:", error)
      res.status(500).send("Error updating watchlist status")
    }
  }

  removeAnimeFromWatchList = async (req, res) => {
    const { animeId, userId } = req.body
    const { userInfo } = req

    if (userInfo.id != userId) {
      return res.status(403).send("Unauthorized")
    }

    try {
      const deleteQuery = `
      DELETE FROM WATCHLIST
      WHERE anime_id = $1 AND user_id = $2;
    `
      await pool.query(deleteQuery, [animeId, userId])
      res.redirect("/watch-list")
    } catch (error) {
      console.error("Error removing anime from watchlist:", error)
      res.status(500).send("Error removing anime from watchlist")
    }
  }

  renderWatchListPage = async (req, res) => {
    const { userInfo } = req
    try {
      const watchListQuery = `
      SELECT a.ANIME_ID, a.ANIME_NAME, a.ANIME_IMG, w.STATUS, w.ADDED_DATE
      FROM WATCHLIST w
      JOIN ANIME a ON w.ANIME_ID = a.ANIME_ID
      WHERE w.USER_ID = $1
      ORDER BY 
        CASE 
          WHEN w.STATUS IN ('watching', 'watch-later') THEN 0 
          ELSE 1 
        END,
        w.ADDED_DATE DESC
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
    const { anime_id, rating, review_text } = req.body
    const { userInfo } = req // Assuming you have user information in the request

    try {
      // Check if the user has already reviewed this anime
      const existingReviewQuery =
        "SELECT * FROM REVIEW WHERE ANIME_ID = $1 AND USER_ID = $2"
      const existingReview = await pool.query(existingReviewQuery, [
        anime_id,
        userInfo.id,
      ])

      if (existingReview.rows.length > 0) {
        // User has already reviewed this anime, update the existing review
        const updateReviewQuery = `
        UPDATE REVIEW 
        SET RATING = $1, REVIEW_TEXT = $2, REVIEW_DATE = CURRENT_TIMESTAMP
        WHERE ANIME_ID = $3 AND USER_ID = $4
      `
        await pool.query(updateReviewQuery, [
          rating,
          review_text,
          anime_id,
          userInfo.id,
        ])
      } else {
        // User hasn't reviewed this anime yet, insert a new review
        const insertReviewQuery = `
        INSERT INTO REVIEW (ANIME_ID, USER_ID, RATING, REVIEW_TEXT)
        VALUES ($1, $2, $3, $4)
      `
        await pool.query(insertReviewQuery, [
          anime_id,
          userInfo.id,
          rating,
          review_text,
        ])
      }

      // Redirect back to the anime page
      res.redirect(`/animes/${anime_id}`)
    } catch (error) {
      console.error("Error adding/updating review:", error)
      res.status(500).send("An error occurred while submitting your review.")
    }
  }
}

module.exports = new DashboardController()
