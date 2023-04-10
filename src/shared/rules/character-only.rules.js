export default {
    message: 'Value must has only character.',
    validate: (body) => {
        const regex = /^[a-zA-Z ]+$/;
        return regex.test(body);
    }
}