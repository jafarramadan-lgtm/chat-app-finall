 const { User } = require("../models/users");
 exports.export=async (req, res) => {
  try {
    const id = req.user.id;
    if (!id) res.status(500).send({ message: "error id" });
    const userFound = await User.findById(id);
    if (!userFound) res.status(500).send({ message: "error user" });
    const fileData = JSON.stringify(userFound, null, 2);
    res.setHeader(
      "Content-Disposition",
      'attachment;filename="user-data.json"',
    );
    res.setHeader("Content-type", "application/json");
    res.send(fileData);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "error server" });
  }}

