import express from "express"
import { requireAuth } from "../middlewares/JWT.js";
import me from "../controllers/meController.js";

const router = express.Router();

router.get("/me",requireAuth,me);
export default router;