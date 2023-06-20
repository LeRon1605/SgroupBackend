import express from 'express';
import { UserRoute } from './users/index.js';
import { AuthRouter } from './auth/index.js';
import { ProfileRouter } from './profile/index.js';
import { PollRouter } from './poll/index.js';

const router = express.Router();

router.use('/users', UserRoute);
router.use('/auth', AuthRouter);
router.use('/profile', ProfileRouter);
router.use('/polls', PollRouter);

export default router;