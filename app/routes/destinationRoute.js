import express from 'express';

import verifyAuth from '../middlewares/verifyAuth';

import { createDestinations, getDestinations } from '../controllers/destinationsController';

const router = express.Router();
//Destinations
router.post('/destination', verifyAuth, createDestinations);
router.get('/destinations', verifyAuth, getDestinations);

module.exports = router;