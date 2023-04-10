export default {
    message: 'Value must not be empty',
    validate: (body) => {
        return body.trim().length > 0;
    }
} 