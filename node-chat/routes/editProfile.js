const verifyToken = require("../middleware/verifyToken");
const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const authControllers = require("../conteollers/editeProfile");

 const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.post(
  "/editeImageProfile",
  verifyToken,
  upload.single("image"),
  authControllers.editeProfile,
);
module.exports = router;
