const express = require('express');
const Contenedor = require('./contenedor');
const contenedor = new Contenedor('./productos.txt');
//import express  from 'express
const { Router } = express;

const app = express();
const routerProductos = Router();

app.use(express.json())
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

///Redireccion///
app.use('/api/productos', routerProductos)

routerProductos.get('/', async (req, res) => {
    try {
        const arrayProductos = await contenedor.getAll();

        res.json(arrayProductos);
    } catch (error) {
        console.log(error)
    }


})

routerProductos.get('/:id', async (req, res) => {

    try {
        const arrayProductos = await contenedor.getAll();
        const notFound = { error: 'Ese producto no existe' };
        const { id } = req.params;
        if (arrayProductos[id - 1]) {
            res.json(arrayProductos[id - 1]);
        } else {
            res.json(notFound);
        }
    } catch (error) {
        console.log(error)
    }


})

routerProductos.post('/', async (req, res) => {
    try {
        const producto = req.body;
        if (producto.title && producto.price && producto.thumbnail) {
            await contenedor.save(producto);
            const data = await contenedor.getAll();
            res.json(data[data.length - 1]);
        }
    } catch (error) {
        console.log(error)
    }


})

routerProductos.put('/:id', async (req, res) => {

    const { id } = req.params;

    const objetoProd = req.body;
    const respuesta = await contenedor.updateById({ ...objetoProd , id: parseInt(id) })
    res.json({ respuesta })

})

routerProductos.delete('/:id', (req, res) => {

    const { id } = req.params;

    try {
        contenedor.deleteById(parseInt(id));

    } catch (error) {
        console.log(error)
    }

})

const PORT = 4000;

const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto; ${server.address().port}`)
})

server.on('error', err => console.log(err))