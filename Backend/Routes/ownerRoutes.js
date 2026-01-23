import ownerController from "../controllers/ownerController.js";
import { requireAuth } from "../middlewares/JWT.js";
import requireOwner from "../middlewares/requireOwner.js";
import express from "express"

const router = express.Router();

router.post("/owner-info",requireAuth,requireOwner,ownerController);
export default router;