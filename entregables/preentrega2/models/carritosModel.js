const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    productos: {
        type: Array,
    }
});

module.exports = mongoose.model('carritos', carritoSchema)