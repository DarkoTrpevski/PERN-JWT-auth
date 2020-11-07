const router = require('express').Router();
const pool = require('../db/db');
//Import Middleware
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async(req, res) => {
  try {
    const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1", [req.user])
    return res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

module.exports = router;