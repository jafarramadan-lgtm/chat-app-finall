const {friend} = require("../models/friends");
exports.friendShip = async (req, res) => {
  try {
    let myid = req.user.id;
    if (!myid) res.status(500).send({ message: "error id" });
    const friendid = req.body.idfriend;
    const myfriend = await friend.findOne({
      $or: [{ friendone: myid  , friendtwo: friendid },{ friendone: friendid  , friendtwo: myid }],
    });
    if (!myfriend) {
      const newFriend = new friend();
      newFriend.friendone = String(myid);
      newFriend.friendtwo = String(friendid);
      await newFriend.save();
      res.send({ friend: "follw" });
     } else {
      await friend.deleteOne({ _id: myfriend._id });
      res.send({ friend: "unfollw" });
     }
  } catch (e) {
     res.status(500).send(e);
  }
};
