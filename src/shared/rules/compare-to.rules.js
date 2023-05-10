export default (errorMessage = null) => {
    return {
        message: errorMessage || 'Value must be matched.',
        validate: (value1, value2) => {
            return value1 === value2;
        }
    }
}