import express from 'express';
import ProfileController from './profile.controller.js';
import { AuthorizationMiddleware } from '../../middlewares/index.js';

const router = express.Router();

router.get('/', AuthorizationMiddleware, ProfileController.getProfile)

export default router;