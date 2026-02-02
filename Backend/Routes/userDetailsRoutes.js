import express from "express"
import userDetailsController from "../controllers/userDetailsController";
import { requireAuth } from "../middlewares/JWT";

const router = express.Router();

router.post("/user-details",requireAuth,userDetailsController);

export default router;