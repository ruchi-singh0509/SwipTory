const jwt = require("jsonwebtoken");

const fetchUserIDMiddleware = (req, res, next) => {
  try {
    const loginToken = req.headers.token;
    const registerToken = req.headers.token
    if (!loginToken && !registerToken) {
      return res
        .status(401)
        .json({ status: "failed", message: "Unauthorized" });
    }

    let user_id=0;
    if (loginToken) {
      const verifyLoginToken = jwt.verify(loginToken, process.env.JWT_SECRET);
      user_id = verifyLoginToken._id;
    } else if (registerToken) {
      const verifyRegisterToken = jwt.verify(registerToken, process.env.JWT_SECRET);
      user_id = verifyRegisterToken._id;
    }
    req.user_id = user_id;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ status: "failed", message: "Invalid token" });
  }
};

module.exports = fetchUserIDMiddleware;
