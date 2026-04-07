import mongoose from "mongoose";
const friendsSchema = new mongoose.Schema({
   friendone:String,
   friendtwo:String,
 
});
export const friend = mongoose.model("friend", friendsSchema);