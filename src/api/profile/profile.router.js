import express from 'express';
import ProfileController from './profile.controller.js';
import { ProfileUpdateValidateRule } from './dto/index.js';
import { AuthorizationMiddleware, ValidationMiddleware } from '../../middlewares/index.js';

const router = express.Router();

router
    .get('/', AuthorizationMiddleware, ProfileController.getProfile)
    .put('/', AuthorizationMiddleware, ValidationMiddleware(ProfileUpdateValidateRule), ProfileController.updateProfile);

export default router;