import mongoose from "mongoose";
const ownerSchema = new mongoose.Schema({
  userId:{
    type : mongoose.Schema.Types.ObjectId,// as it's user's id so it can't be string , i used it in this way so i can fetch it later
    required : true,
    unique : true,
  },
  address : {
    type : String,
    required : true,
  },
  g_address : {
    type : String,
    required : true,
  },
  ownerEmail : {
    type : String,
    required : true,
    unique : true,
  },
  ownerPin : {
    type : String,
    required : true,
  }

})
const Owner = mongoose.model('Owner',ownerSchema);
export default Owner;