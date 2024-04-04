const { check, validationResult } = require('express-validator');
const validator = {};

validator.inventoryRules = () => {
    return [
        check("productName", "Product Name is required")
            .isLength({ min: 2 }),
        check("price", "Price is required")
            .isLength({ min: 1 }),
        check("label", "Must include a nutrition label"),
        check("category", "Product must be assigned a category")
            .isLength({ min: 2 }),
        check("sizeOptions", "Product must have size listed")
            .isLength({ min: 2 }),
        check("productId", "Product must be assigned an Id")
            .isLength({ min: 4 }),
        check("productImage", "Must include a product image")
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

validator.orderRules = () => {
    return [
        check("userName", "Must include a username")
            .isLength({ min: 2 }),
        check("items", "Must be ordering something")
            .islength({ min: 1 }),
        check("orderTotal", "There must be a total cost")
            .isLength({ min: 2 })
    ]
};
validator.checkOrdData = (req, res, next) => {
    
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const validationErrors = [];
    errors.array().map(err => validationErrors.push({ [err.param]: err.msg }));
    return res.status(422).json({ errors: validationErrors });
};

validator.reviewRules = () => {
    return [
        check("userName", "Must include username")
            .isLength({ min: 2 }),
        check("productName", "Must be reviewing a product")
            .isLength({ min: 2 }),
        check("productId", "Must have valid product id")
            .isLength({ min: 1 }),
        check("reviewText", "Must write an actual review")
        .isLength({min: 5})
    ]
}
validator.checkRevData = (req, res, next) => {
    
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const validationErrors = [];
    errors.array().map(err => validationErrors.push({ [err.param]: err.msg }));
    return res.status(422).json({ errors: validationErrors });
};

module.exports = validator;