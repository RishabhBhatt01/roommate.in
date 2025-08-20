import mongoose from "mongoose";
const roomSchema = new mongoose.Schema({
  length : {
    type : String,
    required : true,
  },
  breadth : {
    type : String,
    required : true,
  },
  totalRooms : {
    type : String,
    required : true,
  },
  price : {
    type : String,
    required : true,
  }
})
const Room = mongoose.model('Room',roomSchema);
export default Room;