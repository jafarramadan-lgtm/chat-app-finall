const { friend } = require("../models/friends");
const { User } = require("../models/users");
const { Message } = require("../models/messages");

const mongoose = require("mongoose");
exports.getFriends = async (req, res) => {
  try {
    let myid = req.user.id;
    if (!myid) res.status(500).send({ message: "error id" });
    const friendShip = await friend.find({
      $or: [{ friendone: myid }, { friendtwo: myid }],
    });
    const myFriendsid = friendShip.map((e) => {
      return e.friendone.toString() === myid.toString()
        ? e.friendtwo
        : e.friendone;
    });

    const listFriends = await User.find({ _id: { $in: myFriendsid } });
    const frienWithmsg = await Promise.all(
      listFriends.map(async (u) => {
        const friendId = u._id.toString();
        const lastMsg = await Message.findOne({
          $or: [
            {
              messageFrom: myid,
              messageTo: friendId,
            },
            {
              messageFrom: friendId,
              messageTo: myid,
            },
          ],
        }).sort({ lastMessage: -1 });
        return {
          ...u._doc,
          isFriend: true,
          messageData: lastMsg || null,
          sortTime:
            lastMsg && lastMsg.lastMessage
              ? new Date(lastMsg.lastMessage).getTime()
              : 0,
        };
      }),
    );
    frienWithmsg.sort((a, b) => b.sortTime - a.sortTime);
    res.send(frienWithmsg);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};
