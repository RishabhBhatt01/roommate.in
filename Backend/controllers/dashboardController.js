import axios from "axios";
import User from '../models/User.js'
import Owner from "../models/Owner.js";
import Room from "../models/Room.js";

const dashboardController = async (req,res)=>{
  const userId = req.user._id;
  if(!userId){
    return res.status(400).json({
      error : "User does not exist"
    })
  }
  // Fetching owner ID ..
    const owner = await Owner.findOne({userId : userId});
    if(owner == null){
      return res.status(404).json({error : "Owner not found"});
    }
    const ownerId = owner._id;
    const room = await Room.findOne({ownerId : ownerId});
    if(room == null){
      return res.status(404).json({error : "Room not found"})
    }
    const roomId = room._id;

    const userDetails = await User.findById(userId);
    const ownerDetails = await Owner.findById(ownerId);
    const roomDetails = await Room.findById(roomId);

    // sucess Response
    return res.status(201).json({
      userDetails : userDetails,
      ownerDetails : ownerDetails,
      roomDetails : roomDetails,
    })

}
export default dashboardController;