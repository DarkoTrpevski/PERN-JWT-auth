const jwt = require("jsonwebtoken");
require("dotenv").config();

//Middleware used to check if the JWT that is send is valid
module.exports = async(req, res, next) => {
  try {    

    //Grab the token from the request
    const jwtToken = req.header("token");
    if(!jwtToken) {
      return res.status(403).json("Not Authorized");
    }

    //Concatinating with ""(process.env.jwtSecret + "") because of dotenv import problems
    const payload = jwt.verify(jwtToken, process.env.jwtSecret + "");
    req.user = payload.user;
    next();
    
  } catch (err) {
    console.log(err.message);
    return res.status(403).json("Not Authorized");
  }
}