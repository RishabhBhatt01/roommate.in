import axios from "axios";
import { GOOGLE_MAPS_API_KEY } from "../config/envConfig.js";
import Owner from '../models/Owner.js'

export const geocodeOwnerAddress = async (req,res) => {

  // checking if the owner exists : 
  const userId = req.user._id;
  
  if(!userId){
    return res.status(404).json({error : "User does not exist"});
  }
  
  const owner = await Owner.findOne({userId : userId});

  if(!owner){
    return res.status(400).json({error : "Can't find the owner"});
  }

  // if(owner.role != "owner"){
  //   return res.status(404).json({error : "User is not an owner"});
  // }
  const address = owner.address;

  const apiKey = GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;

  
  
  const response = await axios.get(url);


  if (response.data.status === "OK") {
    const { lat, lng } = response.data.results[0].geometry.location;
    return res.status(200).json({
      latitude : lat,
      longitude : lng
    })
  } else {
    throw new Error("Geocoding failed: " + response.data.status);
  }

  
};
