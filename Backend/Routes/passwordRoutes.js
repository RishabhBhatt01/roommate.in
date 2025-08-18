import express from 'express'
import PasswordInput from '../controllers/passwordController.js'
import { requireAuth } from '../middlewares/JWT.js';

const router = express.Router();

router.post('/password', requireAuth,PasswordInput);

export default router;