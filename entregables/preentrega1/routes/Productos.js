const express = require('express');
const Contenedor = require('../clases/contenedor');
const productos = new Contenedor('./json/productos.json');
const routerProductos = express.Router();
const admin = true;

//Declaraciones de las rutas de productos

routerProductos.get('/', async (req, res) => {
    try {
        const arrayProductos = await productos.getAll();

        res.json(arrayProductos);
    } catch (error) {
        res.send({ status: "error", code: -1, descripcion: error })
    }

})

routerProductos.get('/:id', async (req, res) => {

    try {
        const arrayProductos = await productos.getAll();
        const { id } = req.params;
        if (arrayProductos[id - 1]) {
            res.json(arrayProductos[id - 1]);
            res.send(index)
        } else {
            res.send({ status: "error", code: -3, descripcion: "Producto inexistente" })
        }
    } catch (error) {
        res.send({ status: "error", code: -1, descripcion: error })
    }


})

routerProductos.post('/', async (req, res) => {

    try {
        const objetoProd = req.body;
        console.log(objetoProd)
        if (objetoProd.nombre && objetoProd.descripcion && objetoProd.precio && objetoProd.foto && objetoProd.codigo && objetoProd.stock && admin) {
            await productos.saveProd(objetoProd);
            const data = await productos.getAll();
            //res.json(data[data.length - 1]);
            res.redirect('/') // No se me ocurre como poder hacer para que no refresque pero que el socket lo tome...
        } else {
            if (!admin) {
                res.send({ status: "error", code: -1, descripcion: "Ruta /api/productos/ metodo POST no autorizado" })
            }
            console.log("Hubo un error")
            // res.redirect('/');
        }
    } catch (error) {
        res.send({ status: "error", code: -1, descripcion: error })
    }


})

routerProductos.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const objetoProd = req.body;

        if (admin) {
            console.log(objetoProd.nombre)
            if (objetoProd.nombre || objetoProd.descripcion || objetoProd.precio || objetoProd.foto || objetoProd.codigo || objetoProd.stock) {
                const respuesta = await productos.updateProdById({ id: parseInt(id), ...objetoProd })
                res.send( respuesta )
            }
        } else { res.send({status: "error", code: -1, descripcion: "Ruta /api/productos/id metodo PUT no autorizado" }) }


    } catch (error) {
        res.send({ status: "error", code: -1, descripcion: error })
    }


})

routerProductos.delete('/:id', async (req, res) => {

    const { id } = req.params;

    try {
        if (admin) {
            const respuesta = await productos.deleteById(parseInt(id));
            res.send(respuesta)
        } else {
            res.send({ status: "error", code: -1, descripcion: "Ruta /api/productos/" + id + " metodo DELETE no autorizado" })
        }


    } catch (error) {
        res.send({ status: "error", code: -1, descripcion: error })
    }

})

module.exports = routerProductos;