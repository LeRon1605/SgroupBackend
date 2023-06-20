import express from 'express';
import { AuthorizationMiddleware } from '../../middlewares/index.js';
import PollController from './poll.controller.js';

const router = express.Router();

router
    .get('/', PollController.getAll)
    .post('/', PollController.create)
    .put('/', PollController.update);

router
    .get('/:id', PollController.getDetail)
    .delete('/:id', PollController.remove)
    .post('/:id/options', PollController.addOption)
    .put('/:id/options/:optionId', PollController.updateOption)
    .delete('/:id/options/:optionId', PollController.removeOption);

router
    .post('/:id/submit', AuthorizationMiddleware, PollController.submit)
    .delete('/:id/submit', AuthorizationMiddleware, PollController.unSubmit);
    

export default router;