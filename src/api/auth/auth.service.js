import jwt from 'jsonwebtoken';
import connection from '../../database/connection.js';
import { 
    getOne,
    create,
} from '../../database/query.js';
import {
    HashHelper
} from '../../shared/helpers/index.js';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

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
}

export default new AuthService();