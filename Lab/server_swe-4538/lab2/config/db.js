const Pool = require("pg").Pool

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: "localhost",
    port: 5432,
    database: process.env.DB_NAME,
})

if (pool) {
    console.log("Database connected")
} else {
    console.log("Database connection failed")
}

module.exports = pool
