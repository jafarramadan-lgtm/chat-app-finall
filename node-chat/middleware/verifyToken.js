const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretkey = process.env.SECRETKEY;
const verifyToken = (req, res, next) => {
  const token = req.cookies.userToken;
  if (!token) {
    return res.status(401).json({ message: "you not hav token" });
  }
  try {
    const decoded = jwt.verify(token, secretkey);
    const currentUseragent = req.header("user-agent");

    if (decoded.useragent !== currentUseragent) {
      return res.status(401).json({ message: "you not hav token" });
    }

    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: "you not hav token" });
  }
};
module.exports = verifyToken;
