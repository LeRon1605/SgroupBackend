export default (value) => {
    return {
        message: `Value must be greater than ${value}`,
        validate: (body) => {
            return body > value;
        }
    }
} 