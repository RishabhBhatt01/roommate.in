import express from "express"
import {geocodeOwnerAddress} from "../controllers/geoCodeController.js";
import { requireAuth } from "../middlewares/JWT.js";

const router = express.Router();

router.get("/addressCoordinates",requireAuth,geocodeOwnerAddress);

export default router;
