const mongoose = require('mongoose');

const UserVerificationSchema = mongoose.Schema({
    userID: String,
    token: String,
    createdAt: Date,
    expiresAt: Date
})

const UserVerification = mongoose.model('UserVerification', UserVerificationSchema);
module.exports = UserVerification;