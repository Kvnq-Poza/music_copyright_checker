import express from 'express';
import { MusicController } from '../controllers/MusicController';
import { authMiddleware } from '../middleware/auth';


const router = express.Router();
const musicController = new MusicController();

router.post('/', authMiddleware, musicController.createMusic);
router.get('/user', authMiddleware, musicController.getAllMusicesByUser);
router.post('/create-bulk', musicController.createBulkMusic);
router.get('/all', musicController.getAllMusics);
// router.delete('/delete-all', musicController.deleteMusics);


export default router;