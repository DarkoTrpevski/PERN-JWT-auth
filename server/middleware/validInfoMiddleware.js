//Middleware used to check if credentials are valid
module.exports = (req, res, next) => {

  const { email, name, password } = req.body;

  //Check if email is valid
  const isValidEmail = (userEmail) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }
  
  //If the user is registering
  if (req.path === "/register") {
    //Check if the user input is empty
    if (![email, name, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!isValidEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
    //If the user is logging in    
  } else if (req.path === "/login") {
    //Check if the user input is empty
    if (![email, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!isValidEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
  }
  next();
  
};