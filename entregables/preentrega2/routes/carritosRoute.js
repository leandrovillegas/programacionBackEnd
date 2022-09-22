const express = require('express');
const { getAll, getCarritoId, saveCarrito, addProdInCarritoById, deleteProdInCarritoById, delCarrito } = require('../src/controllers/carritosController');
const routerCarritos = express.Router();

//Declaraciones de las rutas de carrito


routerCarritos.get('/', getAll)

routerCarritos.get('/:id', getCarritoId)

routerCarritos.post('/', saveCarrito)

routerCarritos.post('/:id/productos', addProdInCarritoById)

routerCarritos.delete('/:id/productos/:id_prod', deleteProdInCarritoById)

routerCarritos.delete('/:id', delCarrito)

module.exports = routerCarritos;