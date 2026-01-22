import express from "express"
import multer from "multer"
import { roomImageResponse } from "../controllers/roomImageController.js"
import roomUpload from "../middlewares/roomUpload.js"
import cloudinary from "../config/cloudinary.js"
import { requireAuth } from "../middlewares/JWT.js"

const router = express.Router();

router.post(
  "/upload/room",
  requireAuth,
  roomUpload.single("file"),
  roomImageResponse
);

export default router;