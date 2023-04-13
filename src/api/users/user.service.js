import connection from '../../database/connection.js';
import { UserDto } from './dto/index.js';
class UserService {
    async getAll() {
        const [users] = await connection.query('SELECT * FROM USERS');
        return users.map(x => UserDto.toDto(x));
    }

    async getById(id) {
        const [user] = await connection.query('SELECT * FROM USERS WHERE ID = ?', [id]);
        return UserDto.toDto(user[0]);
    }

    async create(user) {
        await connection.query('INSERT INTO USERS(GENDER, FULLNAME, AGE) VALUES(?, ?, ?);', [user.gender, user.fullname, user.age]);
        const [record] = await connection.query('SELECT LAST_INSERT_ID() AS ID;');
        user.id = record[0].ID;
        return user;
    }

    async update(id, user) {
        await connection.query('UPDATE USERS SET GENDER = ?, FULLNAME = ?, AGE = ? WHERE ID = ?', [user.gender, user.fullname, user.age, id]);
    }

    async removeById(id) {
        await connection.query('DELETE FROM USERS WHERE ID = ?', [id]);
    }
}

export default new UserService();