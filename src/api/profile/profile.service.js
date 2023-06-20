import knex from '../../database/connection.js';
import { ProfileDto } from './dto/profile.dto.js';
class ProfileService {
    async get(userId) {
        const user = await knex.select().from('users').where('ID', userId);
        return ProfileDto.toDto(user);
    }

    async update(body) {
        return await knex('users').where('ID', body.ID).update(
            { NAME: body.name, AGE: body.age, GENDER: body.gender }
        );
    }
}

export default new ProfileService();