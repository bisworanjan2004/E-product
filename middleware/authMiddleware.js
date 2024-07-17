
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  // console.log("object",token)
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.secretKey);
    
    req.user = decoded;
    next();
  } catch (error) {
    
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authMiddleware;
