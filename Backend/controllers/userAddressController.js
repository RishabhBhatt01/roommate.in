import User from '../models/User.js'
import { GOOGLE_MAPS_API_KEY } from '../config/envConfig.js';
import axios from "axios";

const userAddressController = async(req,res) =>{
  try{

    const userId = req.user._id;
    if(!userId){
      return res.status(404).json({error : "User not found"});
    }

    const {building,city,landmark,district,state} = req.body;
    const address = (building + " " + city + " " + landmark + " " + district + " " + state )



  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;

  
  
  const response = await axios.get(url);

  if (response.data.status === "OK") {
    const { lat, lng } = response.data.results[0].geometry.location;

      // Update user with address + coordinates
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        userAddress: address,
        addressCoordinates: { type: "Point", coordinates: [lng, lat] },
      },
      { new: true }
    );
    return res.json({ message: "Address updated successfully", user: updatedUser });
  }else {
  return res.status(400).json({ error: "Geocoding failed", details: response.data.status });
}
    }catch(error){
    console.log(error);
  }
}
export default userAddressController