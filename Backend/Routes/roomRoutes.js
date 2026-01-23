import express from "express"
import roomController from "../controllers/roomController.js"
import { requireAuth } from "../middlewares/JWT.js";
import requireOwner from "../middlewares/requireOwner.js";

const router = express.Router();

router.post("/room-info",requireAuth, requireOwner,roomController);
export default router;