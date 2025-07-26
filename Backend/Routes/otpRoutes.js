import express from "express";
import { sendOtp } from "../controllers/optControllers.js";

const router = express.Router();

router.post("/send-otp",sendOtp); // "Hey Express, when someone sends a POST request to /send-otp, run the sendOtp function."

export default router;