const cloudinary = require("cloudinary").v2;
const express = require("express");
const { User } = require("./models/users");
const { Code } = require("./models/code");
 const bcrypt = require("bcrypt");
require("dotenv").config();
const secretkey = process.env.SECRETKEY;
const login = require("./routes/login");
const active = require("./routes/active");
const getFriends = require("./routes/getFriends");
const refresh = require("./routes/refreshToken");
const profile = require("./routes/profile");
const exportdata = require("./routes/export");
const jwt = require("jsonwebtoken");
const search = require("./routes/search");
const updatePassword = require("./routes/updatePassword");
const getmessage = require("./routes/getmessage");
const editeProfile = require("./routes/editProfile");
const deletAccount = require("./routes/delete");
const getimage = require("./routes/getimage");
const logout = require("./routes/logout");
const friendShip = require("./routes/friendShip");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const cookie = require("cookie");
const websocket = require("ws");
const register = require("./routes/register");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { Message } = require("./models/messages");
const CryptoJs = require("crypto-js");

const app = express();

app.use(
  cors({
    origin: ["https://chat-app-finall-3s2u.vercel.app"], //url front
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
//monogdb//
mongoose
  .connect(process.env.MONGOOSECONNECT)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((e) => {
    console.error("Error connecting to MongoDB:", e);
  });
//
//mongodb//
//////////////////
app.use("/", active);
app.use("/", login);
app.use("/", register);
app.use("/", getmessage);
app.use("/", search);
app.use("/", logout);
app.use("/", profile);
app.use("/", exportdata);
app.use("/", getimage);
app.use("/", updatePassword);
app.use("/", refresh);
app.use("/", getFriends);
app.use("/", friendShip);
app.use("/", editeProfile);
app.use("/", deletAccount);
/////////////////
///websoket Messages//
const wss = new websocket.Server({ port: 3005 });
const clients = new Map();
wss.on("connection", async (ws, req) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || "");

    const decoded = jwt.verify(cookies.userToken, secretkey);
    let id = decoded.id;
    if (id && id.startsWith("j:")) {
      try {
        id = JSON.parse(decodeURIComponent(id.slice(2)));
      } catch (e) {
        id = id.slice(2);
      }
    }
    if (!id) {
      ws.close();
      return;
    }
    console.log("id", id);

    if (!clients.has(id)) {
      clients.set(id, new Set());
    }
    clients.get(id).add(ws);
    const userActiveUpdate = await User.findById(id);
    userActiveUpdate.activated = true;
    await userActiveUpdate.save();
    ws.on("message", async (data) => {
      try {
        const newmsg = new Message();
        const parseData = JSON.parse(data.toString());
        const { to, message } = parseData;
        const receivers = clients.get(to);
        const friend = await User.findById(to);
        const time = new Date();
        try {
          const hashmsg = CryptoJs.AES.encrypt(
            message,
            process.env.HASHMSGKEY,
          ).toString();
          newmsg.messageFrom = id;
          newmsg.messageTo = to;
          newmsg.time = time.getHours() + ":" + time.getMinutes();
          newmsg.message = hashmsg;
          newmsg.lastMessage = Date.now();
          await newmsg.save();
        } catch (e) {
          console.log(e);
        }
        if (receivers && receivers.size > 0) {
          receivers.forEach((receiverWs) => {
            receiverWs.send(
              JSON.stringify({
                msg: newmsg,
                act: friend.activated,
              }),
            );
          });
        }
        const senderConnections = clients.get(id);
        if (senderConnections && senderConnections.size > 0) {
          senderConnections.forEach((senderWs) => {
            senderWs.send(
              JSON.stringify({
                msg: newmsg,
                act: friend.activated,
              }),
            );
          });
        } else {
          ws.send(
            JSON.stringify({
              msg: newmsg,
              act: friend.activated,
            }),
          );
        }
      } catch (e) {
        console.log("invalid message");
      }
    });
    ws.on("close", async () => {
      const dis = await User.findById(id);
      dis.activated = false;
      await dis.save();
      if (clients.has(id)) {
        clients.get(id).delete(ws);
        if (clients.get(id).size === 0) {
          clients.delete(id);
        }
      }
      console.log("User disconnected : ", id);
    });
  } catch (e) {
    ws.close();
  }
});
///websoket Messages//
//cloudinary//
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "chat_avatar",
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 500, height: 500, crop: "fill" }],
  },
});
//cloudinary//
// const wsss = new websocket.Server({ port: 3003 });
// const changeStream = User.watch();
// changeStream.on("change", (c) => {
//   if (
//     c.updateDescription &&
//     c.updateDescription.updatedFields &&
//     c.updateDescription.updatedFields.activated !== undefined
//   ) {
//     const i = c.documentKey._id;
//     const newStatuse = c.updateDescription.updatedFields.activated;
//     console.log("activated changed for", i, "to", newStatuse);
//     broadCastStatus(i, newStatuse);
//   }
// });
// function broadCastStatus(i, newStatus) {
//   wsss.clients.forEach(async (ws) => {
//     const usersFound = await User.findById(i);
//     console.log(usersFound, "gggggggggggggggggg");
//     ws.send(JSON.stringify({ usersFound: usersFound }));
//   });
// }
///websoket Messages//
//
app.post("/code", async (req, res) => {
  const code = req.body.code;
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const findcode = await Code.findOne({ email: email });
  console.log(findcode, "find");
  const sourseCode = findcode.code;
  console.log(sourseCode, "sours");
  console.log(code, "code");
  try {
    if (!code) res.status(400).send({ message: "not Code" });
    else if (code === sourseCode) {
      const newuser = new User();
      const hashPassowrd = await bcrypt.hash(password, 10);
      newuser.name = name;
      newuser.email = email;
      newuser.password = hashPassowrd;
      ((newuser.profileImg = ""), await newuser.save());
      const payload = {
        id: newuser._id,
        useragent: req.headers["user-agent"],
        iat: Math.floor(Date.now() / 1000),
      };
      const token = jwt.sign(payload, secretkey, { expiresIn: "1h" });
      res.cookie("userToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 3600000,
      });
      return res.status(200).send({ message: "Success Code" });
    } else {
      await findcode.delete();
      res.status(400).send({ message: "the Code Not Success" });
    }
  } catch (e) {
    res.status(400).send({ message: e });
  }
});
//
app.listen(8000, () => {
  console.log("server running");
});
