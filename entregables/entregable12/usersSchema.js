const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'name is required']
    },
    password: {
        type: String,
        required: [true, 'Price is required'],
    }
});

module.exports = mongoose.model('users', usersSchema)