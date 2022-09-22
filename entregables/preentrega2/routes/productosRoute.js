const express = require('express');
const { getAll, getById, saveProducto, updateProdById, deleteById } = require('../src/controllers/productosController.js')
const routerProductos = express.Router();


//Declaraciones de las rutas de productos

routerProductos.get('/', getAll)

routerProductos.get('/:id', getById)

routerProductos.post('/', saveProducto)

routerProductos.put('/:id', updateProdById)

routerProductos.delete('/:id', deleteById)

//routerProductos.delete('/', deleteAll)

module.exports = routerProductos;