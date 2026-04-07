
exports.logout =async (req, res) => {
  res.clearCookie("userToken");
  res.send({ message: "logout successful" });
}