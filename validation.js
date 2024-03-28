const { check, validationResult } = require('express-validator');
const validator = {};

validator.inventoryRules = () => {
    return [
        check("productName", "Product Name is required")
            .isLength({ min: 2 }),
        check("price", "Price is required")
            .isLength({ min: 1 }),
        check("category", "Product must be assigned a category")
            .isLength({ min: 2 }),
        check("sizeOptions", "Product must have size listed")
            .isLength({ min: 2 }),
        check("productId", "Product must be assigned an Id")
            .isLength({ min: 4 })
    ]
};

validator.checkInvData = (req, res, next) => {
    
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const validationErrors = [];
    errors.array().map(err => validationErrors.push({ [err.param]: err.msg }));
    return res.status(422).json({ errors: validationErrors });
};

validator.accountRules = () => {
    return [
        check("firstName", "Must include a first name")
            .isLength({ min: 2 }),
        check("lastName", "Must include a last name")
            .isLength({ min: 2 }),
        check("email", "Must include an email")
            .isEmail()
            .isLength({ min: 2 }),
        check("password", "Must include a password")
            .isLength({ min: 2 })
    ]
};
validator.checkAccData = (req, res, next) => {
    
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const validationErrors = [];
    errors.array().map(err => validationErrors.push({ [err.param]: err.msg }));
    return res.status(422).json({ errors: validationErrors });
};


module.exports = validator;