import dashboardController from "../controllers/dashboardController.js";
import express from "express";
import { requireAuth } from "../middlewares/JWT.js";
import requireOwner from "../middlewares/requireOwner.js";

const router = express.Router();

router.get("/dashboard/address",requireAuth,requireOwner,dashboardController);
export default router;