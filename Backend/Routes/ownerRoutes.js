import ownerController from "../controllers/ownerController.js";
import { requireAuth } from "../middlewares/JWT.js";
import express from "express"

const router = express.Router();

router.post("/owner-info",requireAuth,ownerController);
export default router;