//const e = require('express');
const fs = require('fs');
class ContenedorArchivo {


    constructor(ruta) {
        this.ruta = ruta;
    }


    async saveMsj(objeto) {
        try {

            let data = await fs.promises.readFile(this.ruta, 'utf-8');
            let dataParse = JSON.parse(data);
            if (dataParse.length) {
                await fs.promises.writeFile(this.ruta, JSON.stringify([...dataParse, { ...objeto, fyh: new Date().toLocaleString(), id: dataParse[dataParse.length - 1].id + 1 }], null, 2));
            } else {
                await fs.promises.writeFile(this.ruta, JSON.stringify([{ ...objeto, id: 1 }], null, 2));
            }


        } catch (error) {

            return { status: 'error', code: -4, descripcion: error }
        }


    }
    async retornarId(id) {

        try {
            let data = await fs.promises.readFile(this.ruta, 'utf-8');
            let dataParse = JSON.parse(data);
            let libro = dataParse.find(libro => libro.id === id);
            if (libro) {
                console.log(libro);
                return libro;

            } else {
                return { status: 'error', code: -1, descripcion: "Ese carrito no existe" }
            }
        } catch (error) {
            return { status: 'error', code: -4, descripcion: error }

        }

    }



    

    async getAll() {
        try {
            let data = await fs.promises.readFile(this.ruta, 'utf-8');
            let dataParse = JSON.parse(data);
            if (dataParse.length) {

                return dataParse;
            } else {
                return { status: 'error', code: -3, descripcion: "No hay productos" }

            }

        } catch (error) {
            return { status: 'error', code: -4, descripcion: error }
        }

    }

    async deleteById(id) {

        try {
            let data = await fs.promises.readFile(this.ruta, 'utf-8');
            let dataParse = JSON.parse(data);
            let producto = dataParse.find(producto => producto.id === id);
            if (producto) {
                let dataParseFiltrado = dataParse.filter(producto => producto.id !== id);
                await fs.promises.writeFile(this.ruta, JSON.stringify(dataParseFiltrado, null, 2), 'utf-8');
                return { status: 'Ok', code: 200, descripcion: "Eliminado con exito" }

            } else {
                return { status: 'error', code: -1, descripcion: "El objeto que desea eliminar no se encuentra en la lista" }

            }
        } catch (error) {
            return { status: 'error', code: -4, descripcion: error }
        }

    }

    

    async deleteAll() {

        try {
            let data = await fs.promises.readFile(this.ruta, 'utf-8');
            if (data) {

                await fs.promises.writeFile(this.ruta, [], 'utf-8');
                return { status: 'Ok', code: 200, descripcion: "Vaciado" }

            } else {
                return { status: 'error', code: -1, descripcion: "El archivo esta vacio" }
            }
        } catch (error) {
            return { status: 'error', code: -4, descripcion: error }
        }

    }

}

module.exports = ContenedorArchivo;




