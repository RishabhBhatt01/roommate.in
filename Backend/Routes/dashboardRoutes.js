import dashboardController from "../controllers/dashboardController.js";
import express from "express";
import { requireAuth } from "../middlewares/JWT.js";

const router = express.Router();

router.get("/dashboard/address",requireAuth,dashboardController);
export default router;