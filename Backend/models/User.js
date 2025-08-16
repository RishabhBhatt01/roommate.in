import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true,
  },
  phone : {
    type : String,
    required : true,
    unique : true,
  },
  role : {
    type : String,
    enum : ['tenant','owner'],
    required : true
  },
  profilePicture : {
    type : String,
    default : "",
  },                
});

const User = mongoose.model('User',userSchema);
export default User;