import express from 'express';
import UserController from './user.controller.js';

const router = express.Router();

router
    .get('/', UserController.getAllUser)
    .post('/', UserController.createNewUser)
    .get('/:id', UserController.getUserById)
    .delete('/:id', UserController.removeUser)
    .put('/:id', UserController.updateUser);

export default router;