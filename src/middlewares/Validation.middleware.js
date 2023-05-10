export default (configs) => {
    return (req, res, next) => {
        let validateResult = {};
        let isValid = true;
        for (let config of configs) {
            if (config.with) {
                const valueFrom = req[config.from][config.prop];
                const valueWith = req[config.from][config.with];
                if (!config.type.validate(valueFrom, valueWith)) {
                    isValid = false;
                    validateResult[config.prop] = config.type.message;
                }
            } else {
                const value = req[config.from][config.prop];
                if (!config.type.validate(value)) {
                    isValid = false;
                    validateResult[config.prop] = config.type.message;
                }
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