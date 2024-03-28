const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productId: {
        type: Number,
        required: true
    },
    reviewText: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Reviews', reviewSchema);