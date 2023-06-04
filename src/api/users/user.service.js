import connection from '../../database/connection.js';
import { UserDto } from './dto/index.js';
class UserService {
    async getAll(username) {
        const users = await connection.select().where('USERNAME', 'like', `%${username ?? ''}%`).from('users');
        return users.map(x => UserDto.toDto(x));
    }

    async getUserWithPaging(page, size, username) {
        const users = await connection.select().where('USERNAME', 'like', `%${username ?? ''}%`).from('users').limit(size).offset((page - 1) * size);
        return users.map(x => UserDto.toDto(x));
    }

    async getById(id) {
        const user = await connection.select().from('users').where('ID', id);
        return UserDto.toDto(user[0]);
    }

    async create(user) {
        const id = await connection('users').insert(
            { NAME: user.fullname, AGE: user.age, GENDER: user.gender, PASSWORD: user.password }
        ).returning(['ID'])
        user.id = id[0];
        return user;
    }

    async update(id, user) {
        await connection('users').where('ID', id).update(
            { NAME: user.fullname, AGE: user.age, GENDER: user.gender, PASSWORD: user.password }
        );
    }

    async removeById(id) {
        await connection.del().where('ID', id).from('users');
    }
}

export default new UserService();