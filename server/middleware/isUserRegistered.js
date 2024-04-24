const jwt = require("jsonwebtoken");

const isUserRegistered = (req, res, next) => {
  try {
    const registerToken = req.headers.token;
    const user = jwt.verify(registerToken, process.env.JWT_SECRET);
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

module.exports = isUserRegistered;
