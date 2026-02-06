import express from "express"
import userDetailsController from "../controllers/userDetailsController.js";
import { requireAuth } from "../middlewares/JWT.js";

const router = express.Router();

router.post("/user-details",requireAuth,userDetailsController);

export default router;