export default (length) => {
    return {
        message: `Length must be greater than ${length}.`,
        validate: (body) => {
            return body && body.length >= length;
        }
    }
}