const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    password: {
        type: String
    },
    userType: {
        type: String,
        enum: ["User", "Admin"],
        default: "User"
    },
    verification: {
        type: Boolean,
        default: false
    }
});

const user = mongoose.model('User', userSchema);
module.exports = user;