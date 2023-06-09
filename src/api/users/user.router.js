import express from 'express';
import UserController from './user.controller.js';
import ValidationMiddleware from '../../middlewares/Validation.middleware.js';
import UserBodyValidateRules from './dto/user-body.rules.js';
import AuthorizationMiddleware from '../../middlewares/Authorization.middleware.js';

const router = express.Router();

router
    .get('/', UserController.getAllUser)
    .post('/', ValidationMiddleware(UserBodyValidateRules), AuthorizationMiddleware, UserController.createNewUser)
    .get('/:id', UserController.getUserById)
    .delete('/:id', UserController.removeUser)
    .put('/:id', ValidationMiddleware(UserBodyValidateRules), UserController.updateUser);

export default router;