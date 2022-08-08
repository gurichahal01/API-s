const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    full_name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    phoneNumber: {
        type: String
    },
    DOB: {
        type: String
    },
    gender: {
        type: String
    },
    passportImage: {
        type: String,
        default: ""
    },
    profileImage: {
        type: String,
        default: ""
    },
    IdCardImage: {
        type: String,
        default: ""
    }


})
module.exports = mongoose.model('users', userSchema)