import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
  messageFrom: String,
  messageTo: String,
  message: String,
  time: String,
  lastMessage: Date,
  unreadcount: Number,
});
export const Message = mongoose.model("Message", messageSchema);
