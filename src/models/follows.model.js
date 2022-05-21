const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    product_id: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

const Review = mongoose.model('Follow', reviewSchema);
module.exports = Review;