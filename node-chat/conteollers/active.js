const { User } = require("../models/users");
 exports.active = async (req, res) => {
  const id = req.user.id;
  const userFound = await User.findById(id);
  if (!userFound) {
    return res.status(404).send({ message: "user not found" });
  }
  userFound.activated = !userFound.activated;
  await userFound.save();

  res.send({ message: "account activated successfully" });
}
