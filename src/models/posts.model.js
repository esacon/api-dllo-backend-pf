const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    owner_id: {
        type: String,
        required: true
    },
    img_url: {
        type: String,
        required: false,
        lowercase: true
    },
    display_name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;