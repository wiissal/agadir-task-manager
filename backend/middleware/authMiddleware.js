const JWT = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  //get token
  const token = req.header.authorization?.split("")[1];
  if (!token) {
    return res.status(401).json({
      message: "No token provided, please login first",
    });
  }
  //verify
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // so the controller can use it without decoding the token
    next();
  } catch (error) {
    res.status(401).json({
      message: "invalid token",
      error: error.message,
    });
  }
};

module.exports = authMiddleware;
