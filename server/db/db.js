const Pool = require('pg').Pool

const pool = new Pool({
  user: "postgres",
  password: "explorer000",
  host: "localhost",
  port: 5432,
  database: "pern_jwt_login_tutorial_app"
})

module.exports = pool;