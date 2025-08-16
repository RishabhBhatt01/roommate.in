import express from "express";
import { sendOtp, verifyOtp } from "../controllers/otpControllers.js";

const router = express.Router();

console.log("otp routes are loaded");

router.post("/send-otp",sendOtp); // "Hey Express, when someone sends a POST request to /send-otp, run the sendOtp function."
router.post("/verify-otp",verifyOtp);

export default router;