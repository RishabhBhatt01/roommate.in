// Controller function: handles the response after upload
import User from "../models/User.js"

export const imageResponse = async(req, res) => {
  try{
    console.log("Uploaded file info : ",req.file);
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const userId = req.user._id;
  console.log(userId);
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {profilePicture : req.file.path},
    {new:true}
  )
  console.log(updatedUser)

  res.status(200).json({
    message: "File uploaded successfully",
    imageUrl: req.file.path,     // Cloudinary URL
    publicId: req.file.filename, // needed for future deletion
  });
  }catch (error) {
  console.error("Upload failed:", error);
  res.status(500).json({ error: error.message || "upload failed" });
}
}
