const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    label: {
        data: Buffer,
        contentType: String
    },
    category: {
        type: String,
        required: true
    },
    sizeOptions: {
        type: Number,
        required: true
    },
    SKU: {
        type: Number,
        required: true
    },
    productImage: {
        data: Buffer,
        contentType: String
    }


});

module.exports = mongoose.model('Inventory', inventorySchema);