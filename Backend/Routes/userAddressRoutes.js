import express from "express"
import { requireAuth } from "../middlewares/JWT.js";
import userAddressController from "../controllers/userAddressController.js";

const router = express.Router();

router.post('/user-address',requireAuth,userAddressController);
export default router;