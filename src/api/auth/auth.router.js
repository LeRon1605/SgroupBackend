import express from 'express';
import { RegisterValidateRules } from './dto/index.js';
import ValidationMiddleware from '../../middlewares/validation.middleware.js';
import AuthController from './auth.controller.js';

const router = express.Router();

router
    .post('/login', AuthController.login)
    .post('/register', ValidationMiddleware(RegisterValidateRules), AuthController.register)
    .post('/forget-password', AuthController.requestForgetPassword)
    .post('/forget-password/callback', AuthController.resetPassword);

export default router;