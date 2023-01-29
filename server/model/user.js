const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: 'string',
        required: true
    },

    password: {
        type: 'string',
        required: true
    },

    userType: {
        type: String,
        enum : ['student','admin'],
        default: 'student'
    },
})

const User = mongoose.model('User',userSchema);
module.exports = User;