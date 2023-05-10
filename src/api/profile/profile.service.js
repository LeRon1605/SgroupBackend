import connection from '../../database/connection.js';
import {
    getOne,
    update
} from '../../database/query.js';
import { ProfileDto } from './dto/profile.dto.js';
class ProfileService {
    async get(userId) {
        const user = await getOne({
            connection: connection,
            queryString: 'SELECT * FROM USERS WHERE ID = ?',
            params: [userId]
        });
        return ProfileDto.toDto(user);
    }

    async update(body) {
        return await update({
            connection: connection,
            queryString: 'UPDATE USERS SET AGE = ?, NAME = ?, GENDER = ?',
            params: [body.age, body.name, body.gender]
        });
    }
}

export default new ProfileService();