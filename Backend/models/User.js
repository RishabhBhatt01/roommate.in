import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
  username : {
    type : String,
    required : true,
  },
  role : {
    type : String,
    enum : ['tenant','owner'],
    required : true
  },
    phone : {
    type : String,
    required : true,
    unique : true,
  },
    password : {
    type : String,
    default : "",
    required : false,
  },
  profilePicture : {
    type : String,
    default : "",
  },                
}, {timestamps : true});

const User = mongoose.model('User',userSchema);
export default User;