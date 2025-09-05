import axios from "axios";
import { GOOGLE_MAPS_API_KEY } from "../config/envConfig.js";
import Owner from '../models/Owner.js'
import Room from "../models/Room.js";

export const geocodeOwnerAddress = async (req,res) => {
try{

  // checking if the user exists : 
  const userId = req.user._id;
  
  if(!userId){
    return res.status(404).json({error : "User does not exist"});
  }

  // const getting owner using userid
  const owner = await Owner.findOne({userId : userId});
    if(!owner){
    return res.status(400).json({error : "Can't find the owner"});
  }


  // finding address of the room provided by owner.
  const ownerId = owner._id;
  
  // finding room attached by a owner : 
  const room = await Room.findOne({ownerId : ownerId});

  if(!room){
    return res.status(400).json({error : "can't find the room"});
  }
  const address = room.roomAddress;
  const pin = room.pinCode;
  const houseNumber = room.houseNumber;

  const fullAddress = houseNumber + "," + address + "+" + pin
  
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fullAddress)}&key=${GOOGLE_MAPS_API_KEY}`;

  
  
  const response = await axios.get(url);

  if (response.data.status === "OK") {
    const { lat, lng } = response.data.results[0].geometry.location;

    await Room.findByIdAndUpdate(room._id, {
    addressCoordinates: { type: "Point", coordinates: [lng, lat] }
},
{new : true},
); 


    return res.status(200).json({
      latitude : lat,
      longitude : lng
    })
  } else {
    throw new Error("Geocoding failed: " + response.data.status);
  }

}catch(error){
  console.error("error found" , error)
}
};
