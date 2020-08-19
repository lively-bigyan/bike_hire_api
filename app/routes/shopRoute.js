import express from 'express';
import verifyAuth from '../middlewares/verifyAuth';
import { createShop, getAllShops } from '../controllers/shopController';
import { createReview, getReviews } from '../controllers/ratingController';

const router = express.Router();
//Shops
router.post('/addShop', verifyAuth, createShop);
router.get('/shops', verifyAuth, getAllShops);

//Ratings
router.post('/review/:id', verifyAuth, createReview);
router.get('/review/:id', verifyAuth, getReviews);

module.exports = router;