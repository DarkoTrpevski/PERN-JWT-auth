const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id) {
  const payload = {
    user: user_id
  };

  //Concatinating with ""(process.env.jwtSecret + "") because of dotenv import problems
  return jwt.sign(payload, process.env.jwtSecret + "", { expiresIn: "1h" });
}
module.exports = jwtGenerator;