const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/users");
require("dotenv").config();
const secretkey = process.env.SECRETKEY;

exports.login = async (req, res) => {
   const { email, password } = req.body;
  if (
    email.length < 13 ||
    email.length > 30 ||
    password.length < 8 ||
    password.length > 30
  ) {
    return res.status(400).send({ message: "not success" });
  }
  try {
    const userFound = await User.findOne({ email: email });

    if (userFound) {        

      const isPasswordValid = await bcrypt.compare(
        password,
        userFound.password,
      );
      if (isPasswordValid) { 
        const payload = {
          id: userFound._id,
          useragent:  req.headers["user-agent"],
          iat: Math.floor(Date.now() / 1000),
        };
        const token = jwt.sign(payload, secretkey, { expiresIn: "1h" });
        res.cookie("userToken", token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge: 3600000,
        });

        return res.send({ message: "success login" });
      } else {
      return res.status(500).send({ message: "not success" });
    }
    } else {
      return res.status(500).send({ message: "not success" });
    }
  } catch (e) {
    console.log(e);
    return res.status(401).send({ message: "the email or password worong" });
  }
};
