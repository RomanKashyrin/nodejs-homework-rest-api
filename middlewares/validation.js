const validation = schema => {
    return (req, res, next) => {
        if (Object.keys(req.body).length === 0) {
            res.json({
                status: 'error',
                code: 404,
                message: 'Missing fields',
            });
        }

        const validationRes = schema.validate(req.body);
        if (validationRes.error) {
            return res.status(400).json({
                status: validationRes.error.details,
            });
        }
        next();
    };
}

module.exports = validation;