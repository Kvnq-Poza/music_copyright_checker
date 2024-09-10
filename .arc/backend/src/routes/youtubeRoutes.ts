import { YoutubeController } from "../controllers/YoutubeController";
import express from 'express';

const router = express.Router();

const youtubeController = new YoutubeController();


router.get('/search', youtubeController.getVideos);
router.get('/video', youtubeController.getVideoLicense);


export default router;