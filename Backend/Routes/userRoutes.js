import { getUsers ,setUser , getUser } from "../controllers/userController.js";
import express from "express"
import { requireAuth } from "../middlewares/JWT.js";

const router = express.Router();

router.get("/users",getUsers);
router.get("/user",requireAuth, getUser);
router.post("/register-user",setUser);
export default router;