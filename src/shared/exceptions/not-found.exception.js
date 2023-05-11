import HttpException from './http.exception.js';

class NotFoundException extends HttpException {
    constructor(message) {
        super(message, 404);
    }
}

export default NotFoundException;