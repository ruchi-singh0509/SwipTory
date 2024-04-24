const jwt = require("jsonwebtoken");

const isUserLoggedIn = (req, res, next) => {
  try {
    const loginToken = req.headers.token;
    const user = jwt.verify(loginToken, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: "failed",
      message: "user unauthorized",
    });
  }
};

module.exports = isUserLoggedIn;
