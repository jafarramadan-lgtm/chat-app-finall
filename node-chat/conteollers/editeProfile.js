const { User } = require("../models/users");
const cloudinary = require("cloudinary").v2;
exports.editeProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const result = await cloudinary.uploader.upload(req.file.path);

    if (!req.file) {
      res.status(400).send({ message: "no image uploaded" });
      return;
    }
    const imgPath = req.file.path;
    const userFound = await User.findByIdAndUpdate(
      id,
      { profileImg: result.secure_url },
      { new: true },
    );
    res.status(200).send({
      message: "profile image updated",
      profileImg: userFound.profileImg,
    });
  } catch (e) {
    res
      .status(501)
      .send({ message: "error updating profile image", error: e.message });
  }
};
