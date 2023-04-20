import connection from '../../database/connection.js';
class ProfileService {
    async get(userId) {
        const [users] = await connection.query('SELECT * FROM USERS WHERE ID = ?', [userId]);
        return users[0];
    }
}

export default new ProfileService();