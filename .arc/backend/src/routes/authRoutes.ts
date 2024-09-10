import express from 'express';
import { AuthController } from '../controllers/AuhtControllers';
import { authMiddleware } from '../middleware/auth';


const router = express.Router();
const authController = new AuthController();

router.post('/login', authController.login);

export default router;
