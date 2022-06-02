const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    requested: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'undefined'
    }
});

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;