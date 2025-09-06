import express from "express"
import nearbyRoom from "../controllers/nearbyRoom.js";
import { requireAuth } from "../middlewares/JWT.js";


const router = express.Router();

router.get('/nearby-rooms',requireAuth,nearbyRoom)
export default router;
