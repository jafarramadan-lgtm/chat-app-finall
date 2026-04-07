const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretkey = process.env.SECRETKEY;
exports.refreshToken= async (req, res) => {
try{
    const payload = {
    id: req.user.id,
    useragent: req.headers["user-agent"],
    iat: Math.floor(Date.now() / 1000),
  };
  const newToken = jwt.sign(payload, secretkey, { expiresIn: "1h" });
  res.cookie("userToken", newToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 3600000,
  });
   res.json({ message: "token renewed" });
}
catch(e){console.log(e)}
}

