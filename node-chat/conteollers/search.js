const { friend } = require("../models/friends");
const { User } = require("../models/users");
const mongoose = require("mongoose");
const {Types} = mongoose;
exports.search = async (req, res) => {
  try {
    let myid = req.user.id;
    if (!myid) res.status(500).send({ message: "error id" });
    const friendname = req.body.name;
    const listFriends = await User.find({
      name: { $regex: friendname, $options: "i" },
      _id: { $ne: new Types.ObjectId(myid) },
    })
      .select("-password")
      .sort({ name: 1 });
    const myfriend = await friend.find({
      $or: [{ friendone: myid }, { friendtwo: myid }],
    });
    const friendsId = myfriend.map((f) =>
      f.friendone === myid ? f.friendtwo : f.friendone,
    );
    const listwithstatusfreindship = listFriends.map((u) => {
      return {
        ...u._doc,
        isFriend: friendsId.includes(u._id.toString()),
      };
    });

    res.send(listwithstatusfreindship);
  } catch (e) {
     res.status(500).send(e);
  }
};
