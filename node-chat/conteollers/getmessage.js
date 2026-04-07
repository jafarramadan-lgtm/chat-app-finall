const { User } = require("../models/users");
const { Message } = require("../models/messages");
exports.getmessage = async (req, res) => {
  let id = req.user.id;
  const friendId = req.body.frienId;

  if (!id) res.status(500).send("you not have id");
  try {
    const history = await Message.find({
      $or: [
        { messageFrom: id, messageTo: friendId },
        { messageFrom: friendId, messageTo: id },
      ],
    }).sort({ time: 1 });
    const active = await User.findById(friendId);
    res.json({ msg: history, act: active.activated });
  } catch (e) {
    res.status(500).send();
  }
};
