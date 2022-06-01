const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
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

const Follow = mongoose.model('Follow', followSchema);
module.exports = Follow;