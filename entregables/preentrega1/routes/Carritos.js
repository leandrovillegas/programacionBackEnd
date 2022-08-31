const express = require('express');
const Contenedor = require('../clases/contenedor');
const carrito = new Contenedor('./json/carrito.json');
const routerCarrito = express.Router();
const admin = true;

//Declaraciones de las rutas de carrito


routerCarrito.get('/', async (req, res) => {
    try {
        const carritoCompra = await carrito.getAll();
        res.json(carritoCompra);
    } catch (error) {
        res.send({ status: "error", code: -1, descripcion: error })
    }

})

routerCarrito.get('/:id/productos', async (req, res) => {

    try {
        const carritoCompra = await carrito.getAll();
        const { id } = req.params;
        if (carritoCompra[id - 1]) {
            res.json(carritoCompra[id - 1].productos);
        } else {
            res.send({ status: "error", code: -3, descripcion: "Carrito inexistente" })
        }
    } catch (error) {
        res.send({ status: "error", code: -1, descripcion: error })
    }


})

routerCarrito.post('/', async (req, res) => {

    try {
        const objetoCarrito = req.body;
        await carrito.saveCarrito(objetoCarrito);
        const data = await carrito.getAll();
        res.json(data[data.length - 1].id);
    } catch (error) {
        console.log(error)
        res.send({ status: "error", code: -2, descripcion: error })
    }

})

routerCarrito.post('/:id/productos', async (req, res) => {
    const { id } = req.params;
    const objetoProd = req.body;

    try {
        const respuesta = await carrito.addProdInCarritoById({ id: parseInt(id), ...objetoProd })
        res.send(respuesta)
    } catch (error) {
        res.send({ status: "error", error: -2, descripcion: error })
    }


})

routerCarrito.delete('/:id/productos/:id_prod', async (req, res) => {

    const { id } = req.params;
    const { id_prod } = req.params;

    try {
        const respuesta = await carrito.deleteProdInCarritoById(parseInt(id), parseInt(id_prod));
        res.json(respuesta)
    } catch (error) {
        res.send({ status: "error", error: -2, descripcion: error })
    }

})

routerCarrito.delete('/:id', async (req, res) => {

    const { id } = req.params;

    try {
        if (admin) {
            const respuesta = await carrito.deleteById(parseInt(id));
            res.send(respuesta)
        } else {
            res.send({ status: "error", error: -1, descripcion: "Ruta /api/carrito/" + id + " metodo DELETE no autorizado"  })
        }


    } catch (error) {
        res.send({ status: "error", error: -2, descripcion: error })
    }

})

module.exports = routerCarrito;