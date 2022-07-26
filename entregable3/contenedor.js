const fs = require('fs');
class Contenedor {


    constructor(ruta) {
        this.ruta = ruta;
    }

    async save(objeto) {
        try {

            let data = await fs.promises.readFile(this.ruta, 'utf-8');
            let dataParse = JSON.parse(data);
            if (dataParse.length) {
                await fs.promises.writeFile(this.ruta, JSON.stringify([...dataParse, { ...objeto, id: dataParse[dataParse.length - 1].id + 1 }], null, 2));
            } else {
                await fs.promises.writeFile(this.ruta, JSON.stringify([{ ...objeto, id: 1 }], null, 2));
            }


        } catch (error) {

            console.log(error);
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
                console.log("No hay producto");
            }
        } catch (error) {
            console.log("Error lectura");
        }

    }

    async getAll() {
        try {
            let data = await fs.promises.readFile(this.ruta, 'utf-8');
            let dataParse = JSON.parse(data);
            if (dataParse.length) {
                console.log(dataParse);
                //return dataParse;
            } else {
                console.log("No hay productos");
            }

        } catch (error) {
            console.log(error)
        }

    }

    async deleteById(id) {

        try {
            let data = await fs.promises.readFile(this.ruta, 'utf-8');
            let dataParse = JSON.parse(data);
            let libro = dataParse.find(libro => libro.id === id);
            if (libro) {
                let dataParseFiltrado = dataParse.filter(libro => libro.id !== id);
                console.log(dataParseFiltrado);
                await fs.promises.writeFile(this.ruta, JSON.stringify(dataParseFiltrado, null, 2), 'utf-8');
                console.log("Producto eliminado");

            } else {
                console.log("No existe ese producto que desea eliminar");
            }
        } catch (error) {
            console.log("Error lectura");
        }

    }

    async deleteAll() {

        try {
            let data = await fs.promises.readFile(this.ruta, 'utf-8');
            if (data) {

                await fs.promises.writeFile(this.ruta, [], 'utf-8');
                console.log("Archivo vaciado");

            } else {
                console.log("El archivo esta vacio");
            }
        } catch (error) {
            console.log("Error lectura");
        }

    }
}

module.exports = Contenedor;




