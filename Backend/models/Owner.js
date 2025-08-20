import mongoose from "mongoose";
const ownerSchema = new mongoose.Schema({
  id:{
    type : String,
    required,
    unique : true,
  },
  username : {
    type : String,
    required,
  },
  phone : {
    type : String,
    required,
    unique : true,
  },
  address : {
    type : String,
    required : true,
  },
  g_address : {
    type : String,
    required : true,
    unique : true
  },
  ownerEmail : {
    type : String,
    required : true,
    unique : true,
  },
  ownerPin : {
    type : String,
    required : true,
    unique : true,
  }

})
const Owner = mongoose.model('Owner',ownerSchema);
export default Owner;