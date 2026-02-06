import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
  username : {
    type : String,
  },
  role : {
    type : String,
    enum : ['tenant','owner'],
  },
  authProvider : {
    type : String,
    enum : ["google","phone","both"]
  },
  email : {
    type : String,
    unique : true
  },
  googleId:{
    type : String
  },
    phone : {
    type : String,
    unique: true,
    sparse: true,
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

userSchema.index({ addressCoordinates: "2dsphere" })
const User = mongoose.model('User',userSchema);
export default User;