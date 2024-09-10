import express from 'express';
import { TagController } from '../controllers/TagController';

const router = express.Router();
const tagController = new TagController();

// Route to get all tags
router.get('/', tagController.getAllTags);

// Route to get a specific tag by name
router.get('/:tagName', tagController.getTagByName);

// Route to update the count of a specific tag
router.post('/:tagName/count', tagController.updateTagCount);

// Route to get top N tags
router.get('/top/:topN', tagController.getTopTags);

// Route to delete all tags
router.delete('/', tagController.deleteAll);

export default router;
