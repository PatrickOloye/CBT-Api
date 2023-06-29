const mongoose = require('mongoose');





const passwordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    token: {
        type: String,
    },
    email: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    expiredAt: {
        type: Date,
        default: Date.now(),
    }
});




module.exports = mongoose.model('Password', passwordSchema)