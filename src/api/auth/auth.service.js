import jwt from 'jsonwebtoken';
import connection from '../../database/connection.js';
class AuthService {
    async getCredential(username, password) {
        const [users] = await connection.query('SELECT * FROM USERS WHERE FULLNAME = ? AND PASSWORD = ?', [username, password]);
        if (!users || users.length == 0) return null;
        console.log(users);
        return jwt.sign({
            id: users[0].ID,
            username: users[0].FULLNAME
        }, process.env.JWT_SECRET);
    }
}

export default new AuthService();