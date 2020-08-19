import express from 'express';

import verifyAuth from '../middlewares/verifyAuth';

import { createUser, siginUser, verifyUser } from '../controllers/usersController';

const router = express.Router();

//Auth and verification
router.post('/auth/signup', createUser);
router.post('/auth/signin', siginUser);
router.get('/verify', verifyAuth, verifyUser);



module.exports = router;