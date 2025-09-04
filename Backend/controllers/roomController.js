import axios from "axios";
import Owner from "../models/Owner.js";
import Room from "../models/Room.js";
import { GOOGLE_MAPS_API_KEY } from "../config/envConfig.js";

const roomController = async (req, res) => {
  try {
    console.log("📌 Reached roomController");

    // Extract details from request body
    const {
      houseNumber,
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
    const fullAddress = `${houseNumber}, ${landMark}, ${city}, ${district}, ${state}, ${pinCode}`;

    // Call Google Maps Geocoding API
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      fullAddress
    )}&key=${GOOGLE_MAPS_API_KEY}`;

    const response = await axios.get(url);

    if (response.data.status !== "OK") {
      throw new Error("Geocoding failed: " + response.data.status);
    }

    // Extract latitude and longitude
    const { lat, lng } = response.data.results[0].geometry.location;

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
      room: savedRoom,
    });
  } catch (error) {
    console.error("❌ Error in roomController:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default roomController;
