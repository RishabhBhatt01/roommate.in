import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import {CloudinaryStorage} from "multer-storage-cloudinary"

const storage = new CloudinaryStorage({
  cloudinary,
  params : {
    folder : "profile_pictures", // Store in a specific folder
    allowed_formats : ["jpg","png","jpeg"], // optional format restriction
    public_id : (req,file) => `user_${Date.now()}`,

  },
})

const upload = multer({ storage });
export default upload;