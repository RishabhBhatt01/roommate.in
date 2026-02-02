import User from "../models/User.js";
import Owner from "../models/Owner.js";
import Room from "../models/Room.js";

export const roomImageResponse = async (req, res) => {
  try {
    
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    
    const { roomId } = req.body;
    if (!roomId) {
      return res.status(400).json({ error: "roomId is required" });
    }

    
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    
    const owner = await Owner.findOne({ userId });
    if (!owner) {
      return res.status(403).json({ error: "Owner not found" });
    }

    if (room.ownerId.toString() !== owner._id.toString()) {
      return res.status(403).json({ error: "Not authorized for this room" });
    }

   
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    
    const roomImageData = {
      url: req.file.path,
      publicId: req.file.filename,
    };

   
    await Room.findByIdAndUpdate(
      roomId,
      { $push: { roomImages: roomImageData } },
      { new: true }
    );

    return res.status(200).json({
      message: "Room image uploaded successfully",
      imageUrl: req.file.path,
    });

  } catch (error) {
    console.error("Upload failed:", error);
    return res.status(500).json({
      error: error.message || "Room image upload failed",
    });
  }
};
