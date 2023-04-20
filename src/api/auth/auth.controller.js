import AuthService from './auth.service.js';
class AuthController {
    async login(req, res) {
        const { username, password } = req.body;
        const token = await AuthService.getCredential(username, password);
        if (!token) {
            return res.status(401).json({
                message: 'Username or password is incorrect.'
            });
        }
        return res.status(200).json({
            access_token: token
        });
    }
}

export default new AuthController();