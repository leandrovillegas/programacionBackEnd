const admin = true;
const { response } = require('express')
const { carritosDao } = require('../index.js')

//Declaraciones de las rutas de carrito

const getAll = async (req, res = response) => {
    try {
        const carritoCompra = await carritosDao.getAll();
        res.json(carritoCompra);
    } catch (error) {
        res.send({ status: "error", code: -1, descripcion: error })
    }

}
const getCarritoId = async (req, res = response) => {
    try {

        const { id } = req.params;
        const carritoCompra = await carritosDao.getById(id);
        /*  if (carritoCompra[id - 1]) {
              res.json(carritoCompra[id - 1].productos);*/
        if (carritoCompra) {
            res.json(carritoCompra)
        } else {
            res.send({ status: "error", code: -3, descripcion: "Carrito inexistente" })
        }
    } catch (error) {
        res.send({ status: "error", code: -1, descripcion: error })
    }


}
const saveCarrito = async (req, res = response) => {
    try {
        const objetoCarrito = req.body;
        await carritosDao.saveCarrito(objetoCarrito);
        const data = await carritosDao.getAll();
        res.json(data[data.length - 1].id);
    } catch (error) {
        console.log(error)
        res.send({ status: "error", code: -2, descripcion: error })
    }

}
const addProdInCarritoById = async (req, res = response) => {
    const { id } = req.params;
    const objetoProd = req.body;
    try {
        //const respuesta = await carritosDao.update({ id: parseInt(id), ...objetoProd }) funciona para FS
        const respuesta = await carritosDao.addProdInCarrito( id, objetoProd )
        res.send(respuesta)
    } catch (error) {
        res.send({ status: "error", error: -2, descripcion: error })
    }


}

const deleteProdInCarritoById = async (req, res = response) => {
    const { id } = req.params;
    const { id_prod } = req.params;

    try {
        //const respuesta = await carritosDao.deleteProdInCarritoById(parseInt(id), parseInt(id_prod)); funciona para FS
        const respuesta = await carritosDao.deleteProdInCarritoById(id, id_prod);
        res.json(respuesta)
    } catch (error) {
        res.send({ status: "error", error: -2, descripcion: error })
    }

}

const delCarrito = async (req, res = response) => {
    const { id } = req.params;

    try {
        if (admin) {
            //const respuesta = await carritosDao.deleteById(parseInt(id)); funciona para FS
            const respuesta = await carritosDao.deleteById(id);
            res.send(respuesta)
        } else {
            res.send({ status: "error", error: -1, descripcion: "Ruta /api/carrito/" + id + " metodo DELETE no autorizado" })
        }


    } catch (error) {
        res.send({ status: "error", error: -2, descripcion: error })
    }

}

module.exports = { getAll, getCarritoId, saveCarrito, addProdInCarritoById, deleteProdInCarritoById, delCarrito };