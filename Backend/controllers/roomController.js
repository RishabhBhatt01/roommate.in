import axios from "axios";
import Owner from "../models/Owner.js";
import Room from "../models/Room.js";

// Info : it take room's address from Roominfo.jsx, roomRoutes.js -> roomController.js

const roomController = async (req, res) => {
  try {

    // Extract details from request body
    const {
      city,
      pinCode,
      landMark,
      district,
      state,
      roomSize,
      roomPrice,
    } = req.body;


    // Find owner based on logged-in user
    const owner = await Owner.findOne({ userId: req.user._id });
    if (!owner) {
      return res.status(404).json({ error: "Owner not found" });
    }

    const ownerId = owner._id;
    const ownerName = owner.ownerName;

    // Build full address string (formatted with commas)
    // const fullAddress = `${houseNumber}, ${landMark}, ${city}, ${district}, ${state}, ${pinCode}`;
    const fullAddress = `${city}, ${district}, ${state}, ${pinCode}, India`;
    
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

     // Create new Room with coordinates included
    const newRoom = new Room({
      ownerId,
      ownerName,
      roomAddress: fullAddress,
      landMark,
      roomSize,
      roomPrice,
      addressCoordinates: {
        type: "Point",
        coordinates: [lng, lat], // GeoJSON format: [longitude, latitude]
      },
    });

    // Save to DB
    const savedRoom = await newRoom.save();

    // Success response
    return res.status(201).json({
      message: "Room saved successfully ✅",
      roomId: savedRoom._id,
    });
  } catch (error) {
    console.error("❌ Error in roomController:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default roomController;