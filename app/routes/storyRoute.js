import express from 'express';

import verifyAuth from '../middlewares/verifyAuth';
import { createStory, getStories } from '../controllers/storiesController';

const router = express.Router();

router.post('/story', verifyAuth, createStory);
router.get('/stories', verifyAuth, getStories);

module.exports = router;