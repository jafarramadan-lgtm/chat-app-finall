const { User } = require("../models/users");
exports.getimage = async (req, res) => {
  try {
    const id = req.user.id;
    if (!id) return res.status(401).send({ message: "you not hav token" });
    const userFound = await User.findById(id);
    if (!userFound) return res.status(404).send({ message: "user not found" });
    res.status(200).send({
      profileImg: userFound.profileImg,
      name: userFound.name,
      email: userFound.email,
      activated: userFound.activated,
    });
  } catch (e) {
    console.log(e.message);
    res
      .status(500)
      .send({ message: "error fetching profile image", error: e.message });
  }
};
