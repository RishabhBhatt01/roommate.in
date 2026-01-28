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
  userAddress : {
    type : String,
    default : ""
  },
    isProfileComplete : {
    type : Boolean,
    default : false
  },
  isOwnerDetailsComplete : {
      type : Boolean,
      default : false,
  },
  isCreatedRoom : {
    type : Boolean,
    default : false,
  },

  addressCoordinates : {
    type:{
      type : String,
      enum : ["Point"],
      default : "Point"
    },
    coordinates : {
      type : [Number],
      default : [0,0],
    }
  },
}, {timestamps : true});

const User = mongoose.model('User',userSchema);
export default User;