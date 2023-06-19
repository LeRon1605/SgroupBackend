import jwt from 'jsonwebtoken';
import knex from '../../database/connection.js';
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
        const rows = await knex.select().from('users').where('USERNAME', username);
        if (rows.length < 0) return null;
        
        const user = rows[0];
        if (HashHelper.comparePassword({ hashedPassword: user.PASSWORD, salt: user.SALT, rawPassword: password })) {
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
        const user = await knex.select().from('users').where('USERNAME', username);
        return user.length > 0;
    }

    async register(user) {
        const { salt, hashedPassword } = HashHelper.hash(user.password);
        return await knex('users').insert(
            { USERNAME: user.username, PASSWORD: hashedPassword, SALT: salt, EMAIL: user.email, GENDER: user.gender, NAME: user.name, AGE: user.age }
        );
    }

    async getByEmail(email) {
        const user = await knex.select().from('users').where('EMAIL', email);

        return user;
    }

    async generateForgetPasswordToken(userId) {
        const user = await knex.select().from('users').where('ID', userId);

        if (!user) {
            throw new NotFoundException('User does not exist');
        }

        if (user.FORGET_PASSWORD_TOKEN_EXPIRATION < new Date()) {
            const forgetPasswordToken = HashHelper.generateRandomToken();
            const forgetPasswordTokenExpiration = new Date(Date.now() + 30 * 60 * 1000);

            await knex('users').where('ID', userId).update(
                { FORGET_PASSWORD_TOKEN : forgetPasswordToken, FORGET_PASSWORD_TOKEN_EXPIRATION: forgetPasswordTokenExpiration }
            );

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
        const user = await knex.select().from('users').where('FORGET_PASSWORD_TOKEN', token);

        if (user == null) {
            throw new NotFoundException('Invalid token.');
        }

        if (user.FORGET_PASSWORD_TOKEN_EXPIRATION < new Date()) {
            throw new BadRequestException('Forget password token has already expired.')
        }

        const { salt, hashedPassword } = HashHelper.hash(password);
        
        return await knex('users').where('ID', user.ID).update(
            { PASSWORD : hashedPassword, SALT: salt, FORGET_PASSWORD_TOKEN: null, FORGET_PASSWORD_TOKEN_EXPIRATION: null }
        );
    }
}

export default new AuthService();