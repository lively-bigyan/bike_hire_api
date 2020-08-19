import express from 'express';

import verifyAuth from '../middlewares/verifyAuth';

import { createEvent, getAllEvents } from '../controllers/eventController';
const router = express.Router();

//Events
router.post('/event', verifyAuth, createEvent);
router.get('/events', verifyAuth, getAllEvents);

module.exports = router;