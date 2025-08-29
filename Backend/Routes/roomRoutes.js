import express from "express"
import roomController from "../controllers/roomController.js"
import { requireAuth } from "../middlewares/JWT.js";

const router = express.Router();

router.post("/room-info",requireAuth,roomController);
export default router;