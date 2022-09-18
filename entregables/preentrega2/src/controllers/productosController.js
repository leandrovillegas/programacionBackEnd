const { response } = require('express')
const { productosDato } = require('../daos/index.js')
//const express = require('express');
const admin = true;

//Declaraciones de las rutas de productos
const getAll = async (req, res = response) => {
    try {
        const arrayProductos = await productosDato.getAll();

        res.json(arrayProductos);
    } catch (error) {
        res.send({ status: "error", code: -1, descripcion: error })
    }
}
const getPorId = async (req, res = response) => {
    try {
        const arrayProductos = await productosDato.getAll();
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
}

const saveProducto = async (req, res = response) => {
    try {
        const objetoProd = req.body;
        console.log(objetoProd)
        if (objetoProd.nombre && objetoProd.descripcion && objetoProd.precio && objetoProd.foto && objetoProd.codigo && objetoProd.stock) {
            await productos.saveProd(objetoProd);
            const data = await productosDato.getAll();
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
}

const updateProdById = async (req, res = response) => {
    try {
        const { id } = req.params;
        const objetoProd = req.body;

        if (admin) {
            console.log(objetoProd.nombre)
            if (objetoProd.nombre || objetoProd.descripcion || objetoProd.precio || objetoProd.foto || objetoProd.codigo || objetoProd.stock) {
                const respuesta = await productosDato.updateProdById({ id: parseInt(id), ...objetoProd })
                res.send(respuesta)
            }
        } else { res.send({ status: "error", code: -1, descripcion: "Ruta /api/productos/id metodo PUT no autorizado" }) }


    } catch (error) {
        res.send({ status: "error", code: -1, descripcion: error })
    }

}

const deleteById = async (req, res = response) => {
    const { id } = req.params;

    try {
        if (admin) {
            const respuesta = await productosDato.deleteById(parseInt(id));
            res.send(respuesta)
        } else {
            res.send({ status: "error", code: -1, descripcion: "Ruta /api/productos/" + id + " metodo DELETE no autorizado" })
        }


    } catch (error) {
        res.send({ status: "error", code: -1, descripcion: error })
    }

}


module.exports = { getAll, getPorId, saveProducto, updateProdById, deleteById };