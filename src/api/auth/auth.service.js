import jwt from 'jsonwebtoken';
import connection from '../../database/connection.js';
import { 
    getOne,
    create,
    update
} from '../../database/query.js';
import {
    HashHelper
} from '../../shared/helpers/index.js';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import { MailService } from '../../services/index.js';
import { BadRequestException, NotFoundException } from '../../shared/exceptions/index.js';

const fileName = fileURLToPath(import.meta.url);
class AuthService {
    constructor() {
        this.privateKey = fs.readFileSync(path.join(fileName, '../../../shared/secret/private-key.pem'));
    }

    getCredential = async (username, password) => {
        const user = await getOne({
            connection: connection,
            queryString: 'SELECT * FROM USERS WHERE USERNAME = ?',
            params: [username]
        });

        if (user && HashHelper.comparePassword({ hashedPassword: user.PASSWORD, salt: user.SALT, rawPassword: password })) {
            return jwt.sign({
                id: user.ID,
                username: user.NAME
            }, this.privateKey, {
                algorithm: 'RS256'
            });
        }

        return null;
    }

    async checkExist(username) {
        const user = await getOne({
            connection: connection,
            queryString: 'SELECT * FROM USERS WHERE USERNAME = ?',
            params: [username]
        });
        return user != null;
    }

    async register(user) {
        const { salt, hashedPassword } = HashHelper.hash(user.password);
        return await create({
            connection: connection,
            queryString: 'INSERT INTO USERS(USERNAME, PASSWORD, SALT, EMAIL, GENDER, NAME, AGE) VALUES(?, ?, ?, ?, ?, ?, ?)',
            params: [user.username, hashedPassword, salt, user.email, user.gender, user.name, user.age]
        });
    }

    async getByEmail(email) {
        const user = await getOne({
            connection: connection,
            queryString: 'SELECT * FROM USERS WHERE EMAIL = ?',
            params: [email]
        });

        return user;
    }

    async generateForgetPasswordToken(userId) {
        const user = await getOne({
            connection: connection,
            queryString: 'SELECT * FROM USERS WHERE ID = ?',
            params: [userId]
        });

        if (!user) {
            throw new NotFoundException('User does not exist');
        }

        if (user.FORGET_PASSWORD_TOKEN_EXPIRATION < new Date()) {
            const forgetPasswordToken = HashHelper.generateRandomToken();
            const forgetPasswordTokenExpiration = new Date(Date.now() + 30 * 60 * 1000);

            await update({
                connection: connection,
                queryString: 'UPDATE USERS SET FORGET_PASSWORD_TOKEN = ?, FORGET_PASSWORD_TOKEN_EXPIRATION = ? WHERE ID = ?',
                params: [forgetPasswordToken, forgetPasswordTokenExpiration, userId]
            });

            return forgetPasswordToken;
        } else {
            return user.FORGET_PASSWORD_TOKEN;
        }
    }

    async sendForgetPasswordMail(user, forgetPasswordToken) {
        const content = `
            <p>UserId: ${user.ID}</p>
            <p>Mã thay đổi mật khẩu: ${forgetPasswordToken}</p>
        `;
        await MailService.sendMail(user.EMAIL, 'Thay đổi mật khẩu', content);
    }

    async resetPassword(token, password) {
        const user = await getOne({
            connection: connection,
            queryString: 'SELECT * FROM USERS WHERE FORGET_PASSWORD_TOKEN = ?',
            params: [token]
        });

        if (user == null) {
            throw new NotFoundException('Invalid token.');
        }

        if (user.FORGET_PASSWORD_TOKEN_EXPIRATION < new Date()) {
            throw new BadRequestException('Forget password token has already expired.')
        }

        const { salt, hashedPassword } = HashHelper.hash(password);
        return await update({
            connection: connection,
            queryString: 'UPDATE USERS SET PASSWORD = ?, SALT = ?, FORGET_PASSWORD_TOKEN = ?, FORGET_PASSWORD_TOKEN_EXPIRATION = ? WHERE ID = ?',
            params: [hashedPassword, salt, null, null, user.ID]
        });
    }
}

export default new AuthService();