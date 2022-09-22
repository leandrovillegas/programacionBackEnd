const mongoose = require('mongoose');

const productosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'name is required']
    },
    precio: {
        type: Number,
        required: [true, 'Price is required'],
    },
    foto: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('productos', productosSchema)