import mongoose from "mongoose";
const codeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 180,
  },
});
export const Code = mongoose.model("Code", codeSchema);
