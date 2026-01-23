import User from '../models/User.js'
import axios from "axios";

const userAddressController = async(req,res) =>{
  try{

    const userId = req.user._id;
    if(!userId){
      return res.status(404).json({error : "User not found"});
    }

    const {city,district,state} = req.body;

    const fullAddress = `${city}, ${district}, ${state}, India`;



    // Call nominatim api
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(fullAddress)}&format=json`;


    const response = await axios.get(url,{
  headers: {
    "User-Agent": "roommate.in"
  }
}
);

  // 2. Check: address resolve hua ya nahi
  if (response.data.length === 0) {
    // API chali, par address nahi mila
    throw new Error("Address not found");
  }

  // 3. Latitude & Longitude 
  const lat = Number(response.data[0].lat);
  const lng = Number(response.data[0].lon);


      // Update user with address + coordinates
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        userAddress: fullAddress,
        addressCoordinates: { type: "Point", coordinates: [lng, lat] },
      },
      { new: true }
    );
    return res.json({ message: "Address updated successfully", user: updatedUser.addressCoordinates });
    
  }catch (error) {
  console.log(error);
  return res.status(500).json({ error: "Failed to save user address" });
}
}
export default userAddressController