const express = require('express');
const Contenedor = require('../src/contenedores/contenedorArchivo');
const carrito = new Contenedor('./json/carrito.json');
const carritosRoute = express.Router();
const admin = true;

//Declaraciones de las rutas de carrito


carritosRoute.get('/',    )

carritosRoute.get('/:id/productos',  )

carritosRoute.post('/', )

carritosRoute.post('/:id/productos', )

carritosRoute.delete('/:id/productos/:id_prod', )

carritosRoute.delete('/:id', )

module.exports = carritosRoute;