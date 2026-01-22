import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import {CloudinaryStorage} from "multer-storage-cloudinary"

const roomStorage = new CloudinaryStorage({
  cloudinary,
  params : {
    folder : "room_pictures", // Store in a specific folder
    allowed_formats : ["jpg","png","jpeg"], // optional format restriction
    public_id : (req,file) => `user_${Date.now()}`,
  },
})

const roomUpload = multer({ storage : roomStorage });
export default roomUpload;