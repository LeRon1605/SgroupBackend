export default (configs) => {
    return (req, res, next) => {
        let validateResult = {};
        let isValid = true;
        for (let config of configs) {
            const value = req[config.from][config.prop];
            if (!config.type.validate(value)) {
                isValid = false;
                validateResult[config.prop] = config.type.message;
            }
        }
        if (!isValid) {
            return res.status(400).json({
                message: 'Validate error',
                details: validateResult
            })
        }
        next();
    };
}