const { response } = require('express')
const { productosDao } = require('../index.js')
//const express = require('express');
const admin = true;

//Declaraciones de las rutas de productos
const getAll = async (req, res = response) => {
    try {
        const arrayProductos = await productosDao.getAll();

        res.json(arrayProductos);
    } catch (error) {
        res.send({ status: "error", code: -1, descripcion: error })
    }
}
const getById = async (req, res = response) => {
    try {
       // const arrayProductos = await productosDao.getAll();    funciona para archivos
        const { id } = req.params;
        const prod= await productosDao.getById(id)
     /*  if (arrayProductos[id - 1]) {  funciona para archivos
            res.json(arrayProductos[id - 1]);
            res.send(index)*/
        if(prod){
            res.json(prod)
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
        if (objetoProd.nombre && objetoProd.precio && objetoProd.foto) {
            await productosDao.saveProd(objetoProd);
            const data = await productosDao.getAll();
            res.json(data[data.length - 1]);
            //res.redirect('/') // No se me ocurre como poder hacer para que no refresque pero que el socket lo tome...
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
            
            if (objetoProd.nombre || objetoProd.descripcion || objetoProd.precio || objetoProd.foto || objetoProd.codigo || objetoProd.stock) {
                //const respuesta = await productosDao.updateProdById({ id: parseInt(id), ...objetoProd }) funciona para archivos
                const respuesta = await productosDao.updateProdById({ id: id, ...objetoProd })
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
            //const respuesta = await productosDao.deleteById(parseInt(id)); funciona para archivos
            const respuesta = await productosDao.deleteById(id);
            res.send(respuesta)
        } else {
            res.send({ status: "error", code: -1, descripcion: "Ruta /api/productos/" + id + " metodo DELETE no autorizado" })
        }


    } catch (error) {
        res.send({ status: "error", code: -1, descripcion: error })
    }

}


module.exports = { getAll, getById, saveProducto, updateProdById, deleteById };