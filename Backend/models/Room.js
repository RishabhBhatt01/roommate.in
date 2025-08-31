import mongoose from "mongoose";


//  {roomAddress,houseNumber,pinCode,landMark,roomSize,RoomPrice},
const roomSchema = new mongoose.Schema({
  ownerId :{
    type : mongoose.Types.ObjectId,
    ref : 'Owner',
    required : true,
  },
  ownerName:{
    type : String,
    required : true,
  },
  roomAddress : {
    type : String,
    required : true,
  },
  houseNumber : {
    type : String,
    required : true,
  },
  pinCode : {
    type : String,
    required : true,
  },
  landMark : {
    type : String,
  },
  roomSize : {
    type : String,
  },
  roomPrice : {
    type : String,
    required : true,
  },
  addressCoordinates : {
    
    type : {
      type : String,
      enum : ["Point"],
      default : "Point",
    },
    coordinates : {
      type : [Number],
      default : [0,0]
    },
  }
})

roomSchema.index({ addressCoordinates: "2dsphere" });
const Room = mongoose.model('Room',roomSchema);
export default Room;