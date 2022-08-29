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
        console.log(error)
    }

})

routerCarrito.get('/:id/productos', async (req, res) => {

    try {
        const carritoCompra = await carrito.getAll();
        const notFound = { error: -2, descripcion: 'El carrito al que desea acceder no existe' };
        const { id } = req.params;
        if (carritoCompra[id - 1]) {
            res.json(carritoCompra[id - 1].productos);

        } else {
            res.json(notFound);
        }
    } catch (error) {
        console.log(error)
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
        res.json({ error: -2, descripcion: "Su carrito no pudo crearse , intente nuevamente." })
    }

})

routerCarrito.post('/:id/productos', async (req, res) => {

    const { id } = req.params;
    const objetoProd = req.body;
    const respuesta = await carrito.addProdInCarritoById({ id: parseInt(id), ...objetoProd })
    res.json({ respuesta })

})

routerCarrito.delete('/:id/productos/:id_prod', async (req, res) => {

    const { id } = req.params;
    const { id_prod } = req.params;

    try {
        await carrito.deleteProdInCarritoById(parseInt(id), parseInt(id_prod));
        res.json({ ok: 200, descripcion: "Producto eliminado con exito" })
    } catch (error) {
        console.log(error)
        res.json({ error: -2, descripcion: "No se encontro el carrito o producto que se decidio eliminar" })
    }

})

module.exports = routerCarrito;