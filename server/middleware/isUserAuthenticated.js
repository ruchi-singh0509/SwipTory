const isUserLoggedIn = require("./isUserLoggedIn");
const isUserRegistered = require("./isUserRegistered");

const isUserAuthenticated = (req, res, next) => {
  const loginToken = req.headers.token;
  const registerToken = req.headers.token;

  if (loginToken) {
    return isUserLoggedIn(req, res, next);
  } else if (registerToken) {
    return isUserRegistered(req, res, next);
  } else {
    return res.status(401).json({
      status: "failed",
      message: "Unauthorized",
    });
  }
};

module.exports = isUserAuthenticated;
