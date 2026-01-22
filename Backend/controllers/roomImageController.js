// This page will control how to handle room's image
import User from '../models/User.js'
import Owner from '../models/Owner.js'
import Room from '../models/Room.js'

// Extract user id
export const roomImageResponse = async(req,res) => {
  try{
    const userId = req.user._id;
    if(!userId){
      return res.status(404).json({error : "User not found"});
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
    console.log("Upload file info : ",req.file);

    // Uploading room in room schema, in db
    const roomImageData = {
      url : req.file.path,
      publicId : req.file.filename
    };


    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      { $push: {
        roomImages: roomImageData
       } },
      {new:true}
    )

    res.status(200).json({
      message : "File upload successfully",
      imageUrl : req.file.path,
      publicId : req.file.filename
    });
  }
  catch (error){
    console.error("upload failed",error);
    res.status(500).json({error : error.message || "upload failed"});

  }
}