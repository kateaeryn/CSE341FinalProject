const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({

    userName: {
        type: String,
        required: true,
        },
    items: [{
        itemId: {
            type: String,
            required: true
        },
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        },
        price: Number
    }],
    orderTotal: {
        type: Number,
        required: true,
        default: 0
    }
});
       

module.exports = mongoose.model('Orders', orderSchema);