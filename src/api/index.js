import express from 'express';
import { UserRoute } from './users/index.js';
import { AuthRouter } from './auth/index.js';
import { ProfileRouter } from './profile/index.js';

const router = express.Router();

router.use('/users', UserRoute);
router.use('/auth', AuthRouter);
router.use('/profile', ProfileRouter);

export default router;