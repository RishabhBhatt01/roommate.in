import express from "express"
import  googleAuth  from "../controllers/googleAuthController.js";
import googleAuthCallback from "../controllers/googleAuthCallBackController.js";
const router = express.Router();

router.get("/auth/google", googleAuth);
router.get("/auth/google/callback", googleAuthCallback);

export default router;