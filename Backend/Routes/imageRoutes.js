import express from "express";
import multer from "multer";
import { imageResponse } from "../controllers/imageController.js";
import upload from "../middlewares/cloudinaryMulter.js";

import cloudinary from "../config/cloudinary.js";

const router = express.Router();

// Route uses Multer + Controller
// router.post("/upload", upload.single("file"), imageResponse);
router.post( "/upload",upload.single("file"),
  (err, req, res, next) => {
    res.status(500).json({ error: err.message || "Upload failed" });
  },
  imageResponse
);

export default router;
