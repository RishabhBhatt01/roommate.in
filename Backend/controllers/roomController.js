import Owner from "../models/Owner.js";
import Room from "../models/Room.js";
const roomController = async(req,res)=>{
  try{
    console.log("reached roomcontroller");
    const {roomAddress,houseNumber,pinCode,landMark,roomSize,roomPrice} = req.body;

    const owner = await Owner.findOne({userId : req.user._id});


    if(!owner){
      return res.status(404).json({error : "Owner not found"});
    }
    const ownerId = owner._id;
    const ownerName = owner.ownerName;

    const newRoom = new Room({
      ownerId,ownerName,roomAddress,houseNumber,pinCode,landMark,roomSize,roomPrice
    })

    const savedRoom = await newRoom.save();
    return res.status(200).json({
      message : "ROOM SAVED TO DATABASE",
      roomDetails : savedRoom
    })




  }catch(error){
    console.error(error);
    return res.status(500).json({error : "Internal server error"})
  }
}
export default roomController;