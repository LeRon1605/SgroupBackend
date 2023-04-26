import ProfileService from './profile.service.js';
import { ProfileUpdateDto } from './dto/index.js';
class ProfileController {
    async getProfile(req, res, next) {
        const profile = await ProfileService.get(req.session.id);
        return res.status(200).json(profile);
    }

    async updateProfile(req, res, next) {
        const profile = await ProfileService.get(req.session.id);

        const result = await ProfileService.update({
            ...profile,
            ...ProfileUpdateDto.toEntity(req.body)
        });

        return res.status(200).json({
            success: result,
            message: `Update ${result ? 'sucessfully' : 'failure'}`
        });
    }
}

export default new ProfileController();