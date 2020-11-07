const router = require('express').Router();
const pool = require('../db/db');
const bcrypt = require('bcrypt');
//Import JWT Generator
const jwtGenerator = require("../utils/jwtGenerator");
//Import Middleware
const authMiddleware = require("../middleware/authMiddleware");
const validInfoMiddleware = require("../middleware/validInfoMiddleware");

//Register
router.post("/register", validInfoMiddleware, async(req, res) => {

  try {

    const { email, name, password } = req.body;

    //Check if there is a User with that email address
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

    //If there is no User with that email, salt the password of the user
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    //Create a new User
    let newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

    //Generate/Return a JWT
    const jwtToken = jwtGenerator(newUser.rows[0].user_id);
    return res.json({ jwtToken });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", validInfoMiddleware, async(req, res) => {
  try {

    const{ email, password } = req.body;
    //Check if user exists
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
    if(user.rows.length === 0) {
      return res.status(401).json("Invalid credentials");
    }
    //Compare the passwords
    const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
    if(!validPassword) {
      return res.status(401).json("Invalid credentials")
    }
    //Generate/Return a JWT
    const jwtToken = jwtGenerator(user.rows[0].user_id);
    return res.json({ jwtToken });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

router.get("/me", authMiddleware, async(req, res) => {
  try {
    //If the user passes our middleware, we know the user is valid
    res.json(true);
    
  } catch (err) {
    console.error(err.message);
    res.status(403).json("User is not authorized");
  }
})

module.exports = router;