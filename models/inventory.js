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
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    sizeOptions: {
        type: String,
        required: true
    },
    productId: {
        type: Number,
        required: true
    },
    productImage: {
        type: String,
        required:true
    }


});

module.exports = mongoose.model('Inventory', inventorySchema);