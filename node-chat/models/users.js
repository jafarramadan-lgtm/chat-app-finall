import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  profileImg: String,
  activated:{type: Boolean, default: true},
 });
export const User = mongoose.model("User", userSchema);
