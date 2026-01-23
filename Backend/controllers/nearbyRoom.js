import User from "../models/User.js";
import Room from "../models/Room.js";
// will work here today
const nearbyRoom = async(req,res) =>{
  try{
    const userId = req.user._id;
    const range = req.query.range  ? parseFloat(req.query.range)  : 1000; // default km;

    if(!userId){
      return res.status(404).json({error : "User not found"})
    }
    // getting the context of userCoordinates
    const user = await User.findById(userId);
    const maxDistance = range*1000;

    if(!user.addressCoordinates ||   !Array.isArray(user.addressCoordinates.coordinates) ||                user.addressCoordinates.coordinates.length !== 2){
      return res.status(400).json({error : "User does not have coordinates"});
    }

    const [lng,lat] = user.addressCoordinates.coordinates;

    // Query nearby rooms
    // Nearby rooms are : 

    const rooms = await Room.find({
      addressCoordinates : {
        $near:{
          $geometry:{type:"Point",coordinates:[lng,lat]},
          $maxDistance:maxDistance
        }
        
      }
    }).select("ownerName roomPrice roomAddress roomSize addressCoordinates")


    // Return rooms 
res.status(200).json({
  success: true,
  count: rooms.length,
  userCoordinates: { lat, lng },
  rooms, // this will include all nearby rooms
});
  }catch(error){
    console.log(error);
    return res.status(500).json({ error: "Failed to fetch nearby rooms" });
  }
}

export default nearbyRoom;