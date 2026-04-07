const bcrypt = require("bcrypt");
const { User } = require("../models/users");
exports.updatePassword = async (req, res) => {
  try {
    const id = req.user.id;
    if (!id) return res.status(401).send({ message: "you not hav token" });
    const { currentPassword, newPassword, confirmPassword } = req.body;
    if (
      currentPassword.length < 8 ||
      currentPassword.length > 30 ||
      newPassword.length < 8 ||
      newPassword.length > 30 ||
      confirmPassword.length < 8 ||
      confirmPassword.length > 30
    ) {
      return res.status(500).send({ message: "error updating password" });
    }
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .send({ message: "new password and repeat new password do not match" });
    }
    const userFound = await User.findById(id);
    if (!userFound) {
      return res.status(404).send({ message: "user not found" });
    }
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      userFound.password,
    );
    if (!isPasswordValid) {
      return res.status(400).send({ message: "current password is incorrect" });
    }
    const hashNewPassword = await bcrypt.hash(newPassword, 10);
    userFound.password = hashNewPassword;
    await userFound.save();
    return res.status(200).send({ message: "password updated successfully" });
  } catch (e) {
    console.log(e.message);
    return res
      .status(500)
      .send({ message: "error updating password", error: e.message });
  }
};
