import User from "../models/User.js";

const finalizeRoomController = async (req, res) => {
  if (req.user.isCreatedRoom) {
    return res.status(400).json({ error: "Room already finalized" });
  }

  await User.findByIdAndUpdate(req.user._id, {
    isCreatedRoom: true,
  });

  res.json({ message: "Room finalized" });
};

export default finalizeRoomController;
