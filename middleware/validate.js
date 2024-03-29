const validator = require('./validator.js');

//need to add vaildation for each type of data that is stored, inventory items, accounts, reviews and orders
const vInventory = (req, res, next) => {
    const validationRule = {
        productName: 'required|string',
        price: 'required|numeric',
        label: 'required|string',
        category: 'required|string',
        sizeOptions: 'required|string',
        productId: 'required|numeric',
        productImage: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'validation failed',
                data: err
            })
        } else {
            next();
        }
    });
};
const vOrder = (req, res, next) => {
    const validationRule = {
        userName: 'required|string',
        items: 'required|array',
        orderTotal: 'required|numeric'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'validation failed',
                data: err
            })
        } else {
            next();
        }
    });
};
const vAccount = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        email: 'required|email',
        password: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'validation failed',
                data: err
            })
        } else {
            next();
        }
    });
};
const vReview = (req, res, next) => {
    const validationRule = {
        userName: 'required|string',
        productName: 'required|string',
        productId: 'required|string',
        reviewText: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'validation failed',
                data: err
            })
        } else {
            next();
        }
    });
};
module.exports = {vInventory, vOrder, vAccount,vReview};