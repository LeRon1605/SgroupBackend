import PollService from './poll.service.js';
import { OptionCreateDto, OptionUpdateDto, PollCreateDto, PollUpdateDto } from './dto/index.js';

class PollController {
    async getAll(req, res, next) {
        const polls = await PollService.getAll();
        return res.status(200).json(polls);
    }

    async create(req, res, next) {
        const entity = PollCreateDto.toEntity(req.body);
        await PollService.create(entity);
        return res.status(200).json({
            message: 'Created poll successfully!!'
        });
    }

    async getDetail(req, res, next) {
        const poll = await PollService.getDetail(req.params.id);
        if (!poll) {
            return res.status(404).json();
        }
        return res.status(200).json(poll);
    }

    async update(req, res, next) {
        const pollEntity = PollUpdateDto.toEntity(req.body);
        const result = await PollService.update(req.params.id, pollEntity);
        if (!result) {
            return res.status(400).json();
        }
        return res.status(200).json({
            message: 'Update poll successfully'
        });
    }

    async remove(req, res, next) {
        const result = await PollService.removePoll(req.params.id);
        if (!result) {
            return res.status(404).json();
        }
        return res.status(200).json({
            message: 'Remove poll successfully'
        });
    }

    async updateOption(req, res, next) {
        const optionEntity = OptionUpdateDto.toEntity(req.body);
        const result = await PollService.updateOption(req.params.id, req.params.optionId, optionEntity);
        if (!result) {
            return res.status(404).json();
        }
        return res.status(200).json({
            message: 'Update option successfully'
        });
    }

    async addOption(req, res, next) {
        const optionEntity = OptionCreateDto.toEntity(req.body);
        const result = await PollService.addOption(req.params.id, optionEntity);
        if (!result) {
            return res.status(404).json();
        }
        return res.status(200).json({
            message: 'Add option successfully'
        });
    }

    async removeOption(req, res, next) {
        const result = await PollService.removeOption(req.params.id, req.params.optionId);
        if (!result) {
            return res.status(400).json();
        }
        return res.status(200).json({
            message: 'Remove option successfully'
        });
    }

    async submit(req, res, next) {
        const result = await PollService.submitOption(req.params.id, req.body.optionId, req.session.id);
        if (!result) {
            return res.status(400).json();
        }
        return res.status(200).json({
            message: 'Submit option successfully'
        });
    }

    async unSubmit(req, res, next) {
        const result = await PollService.unSubmitOption(req.params.id, req.body.optionId, req.session.id);
        if (!result) {
            return res.status(400).json();
        }
        return res.status(200).json({
            message: 'Un-Submit option successfully'
        });
    }
}

export default new PollController();