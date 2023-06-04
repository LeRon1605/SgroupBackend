import { MailService } from '../../services/index.js';
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

    async register(req, res) {
        const { username, password, email, gender, name, age } = req.body;

        if (await AuthService.checkExist(username)) {
            return res.status(409).json({
                message: 'User already exist.'
            });
        }

        await AuthService.register({ username, password, email, gender, name, age });
        return res.status(200).json({
            message: 'Register account successfully.'
        })
    }

    async requestForgetPassword(req, res, next) {
        const { email } = req.body;

        const user = await AuthService.getByEmail(email);
        if (!user) {
            return res.status(404).json({
                message: 'User does not exist.'
            });
        }

        const forgetPasswordToken = await AuthService.generateForgetPasswordToken(user.ID);
        await AuthService.sendForgetPasswordMail(user, forgetPasswordToken);

        return res.status(200).json({
            message: 'Please check your mail to continue.'
        });
    }

    async resetPassword(req, res, next) {
        const { token, password } = req.body;

        await AuthService.resetPassword(token, password);
        return res.status(200).json({
            message: 'Reset password successfully.'
        });
    }
}

export default new AuthController();