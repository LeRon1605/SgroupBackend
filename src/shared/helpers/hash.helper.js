import crypto from 'crypto';

class HashHelper {
    hash(input) {
        const salt = crypto.randomBytes(16).toString('hex');
        const hashedPassword = crypto.pbkdf2Sync(input, salt, 1000, 64, 'sha512').toString('hex');
    
        return {
            salt,
            hashedPassword
        }
    }

    comparePassword({ hashedPassword, salt, rawPassword }) {
        const hashedRawPassword = crypto.pbkdf2Sync(rawPassword, salt, 1000, 64, 'sha512').toString('hex'); 
        return hashedPassword === hashedRawPassword;
    }

    generateRandomToken() {
        return crypto.randomBytes(16).toString('hex');
    }
}

const hash = (input) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = crypto.pbkdf2Sync(input, salt, 1000, 64, 'sha512').toString('hex');

    return {
        salt,
        hashedPassword
    }
}

const comparePassword = ({ hashedPassword, salt, rawPassword }) => {

}

export default new HashHelper();