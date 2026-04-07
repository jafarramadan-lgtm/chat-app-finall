 
const { User } = require("../models/users");
const{Code}=require("../models/code")
 

const sendEmail = require("../utils/mailer");

exports.register = async (req, res) => {
  const { email, username, password, repeatePassowrd } = req.body;
  if (
    email.length < 13 ||
    email.length > 30 ||
    password.length < 8 ||
    password.length > 30 ||
    username.length < 4 ||
    username.length > 30 ||
    repeatePassowrd.length < 8 ||
    repeatePassowrd.length > 30
  ) {
    return res.send(error);
  }
 
  if (password !== repeatePassowrd) {
    return res
      .status(401)
      .send({ message: "password not same Repeate Password" });
  }
  try {
    const finduser = await User.findOne({ email: email });

    if (finduser) {
      return res.status(401).send({ message: "worng email or passowr" });
    }
    const code = Math.floor(100000 + Math.random() * 900000);
    try{
     await sendEmail(email, code);
    }catch(e){console.error("Email faild but it is okay:,e.message")}
    const newCode=  new Code()
    newCode.email=email;
    newCode.code=code;
    await newCode.save()
    return res.send({ message: "sucess send Code" });
  } catch (error) {
    return res.send(error);
  }
};
////////////REGISTERT//////////////
