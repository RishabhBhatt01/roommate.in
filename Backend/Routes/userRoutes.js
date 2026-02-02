import { setUser } from "../controllers/userController.js";
import express from "express"
import { requireAuth } from "../middlewares/JWT.js";

const router = express.Router();


router.post("/register-user",setUser);
export default router;