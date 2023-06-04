import HttpException from './http.exception.js';
class BadRequestException extends HttpException {
    constructor(message) {
        super(message, 400);
    }
}

export default BadRequestException;