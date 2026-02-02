import finalizeRoomController from "../controllers/finalizeRoomController.js";
import express from "express";
import { requireAuth } from "../middlewares/JWT.js";
import requireOwner from "../middlewares/requireOwner.js";

const router = express.Router();

router.post("/finalizeRoom",requireAuth,requireOwner,finalizeRoomController);
export default router;