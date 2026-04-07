const { User } = require("../models/users");
 exports.delete=async (req, res) => {
  const id = req.user.id;
  const userFound = await User.findById(id);
  if (!userFound) {
    return res.status(404).send({ message: "user not found" });
  }
  res.clearCookie("userToken");
  await userFound.deleteOne();

  res.send({ message: "account deleted successfully" });
}