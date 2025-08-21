import { getUser ,setUser } from "../controllers/userController.js";
import express from "express"

const router = express.Router();

router.get("/users",getUser);
router.post("/register-user",setUser);
export default router;