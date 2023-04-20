import ProfileService from './profile.service.js';
class ProfileController {
    async getProfile(req, res, next) {
        const profile = await ProfileService.get(req.session.id);
        return res.status(200).json(profile);
    }
}

export default new ProfileController();