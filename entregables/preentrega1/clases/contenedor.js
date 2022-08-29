const e = require('express');
const fs = require('fs');
class Contenedor {


    constructor(ruta) {
        this.ruta = ruta;
    }

    async saveProd(objeto) {
        try {
            console.log(objeto)
            let data = await fs.promises.readFile(this.ruta, 'utf-8');
            let dataParse = JSON.parse(data);
            if (dataParse.length) {
                await fs.promises.writeFile(this.ruta, JSON.stringify([...dataParse, { id: dataParse[dataParse.length - 1].id + 1, timestamp: Date.now(), ...objeto }], null, 2));
            } else {
                await fs.promises.writeFile(this.ruta, JSON.stringify([{ ...objeto, id: 1 }], null, 2));
            }


        } catch (error) {

            console.log(error);
        }


    }

    async saveCarrito(objeto) {
        try {

            let data = await fs.promises.readFile(this.ruta, 'utf-8');
            let dataParse = JSON.parse(data);
            if (dataParse.length) {
                await fs.promises.writeFile(this.ruta, JSON.stringify([...dataParse, { id: dataParse[dataParse.length - 1].id + 1, timestamp: Date.now(), ...objeto }], null, 2));
            } else {
                await fs.promises.writeFile(this.ruta, JSON.stringify([{ ...objeto, id: 1 }], null, 2));
            }


        } catch (error) {

            console.log(error);
        }


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


    async updateProdById(objeto) {
        try {

            let data = await fs.promises.readFile(this.ruta, 'utf-8');
            let dataParse = JSON.parse(data);
            const objetoIndex = dataParse.findIndex(prod => prod.id === objeto.id)
            if (objetoIndex !== -1) {
                dataParse[objetoIndex] = objeto;
                await fs.promises.writeFile(this.ruta, JSON.stringify(dataParse, null, 2));
                return { Ok: 'Ese producto fue actualizado' };
            } else {
                return { error: 'Ese producto no existe' };
            }


        } catch (error) {

            console.log(error);
        }
    }
    async addProdInCarritoById(objeto) {
        try {
            let data = await fs.promises.readFile(this.ruta, 'utf-8');
            let dataParse = JSON.parse(data);
            let objetoIndex = dataParse.findIndex(carrito => carrito.id === objeto.id)
            if (objetoIndex !== -1) {
                let dataIntact = dataParse.filter(carrito => carrito.id !== objeto.id);//Obtenemos y guardamos el/los carrito/s que no coincide con el id enviado
                let carritoIntact = dataParse.find(carrito => carrito.id === objeto.id);//Obtenemos y guardamos el carrito que  coincide con el id enviado
                if (carritoIntact.productos === undefined) {//Nos fijamos si estaba vacio
                    let addObjet = { id: 1, timestamp: Date.now(), ...objeto.productos[0] }
                    const arrayOrdenado = [
                        ...dataIntact,
                        { ...carritoIntact, productos: [addObjet] }
                    ]
                    //Ordenamos el array
                    arrayOrdenado.sort((a, b) => a.id - b.id)
                    await fs.promises.writeFile(this.ruta, JSON.stringify(arrayOrdenado, null, 2));

                } else {

                    let addObjet = { id: carritoIntact.productos[carritoIntact.productos.length - 1].id + 1, timestamp: Date.now(), ...objeto.productos[0] }
                    carritoIntact.productos.push(addObjet)
                    let arrayOrdenado = [
                        ...dataIntact,
                        carritoIntact
                    ]
                    arrayOrdenado.sort((a, b) => a.id - b.id)
                    await fs.promises.writeFile(this.ruta, JSON.stringify(arrayOrdenado, null, 2));
                }



                return { Ok: 'Ese carrito fue actualizado' };
            } else {
                return { error: 'Ese carrito no existe' };
            }


        } catch (error) {

            console.log(error);
        }
    }

    async getAll() {
        try {
            let data = await fs.promises.readFile(this.ruta, 'utf-8');
            let dataParse = JSON.parse(data);
            if (dataParse.length) {

                return dataParse;
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
            let producto = dataParse.find(producto => producto.id === id);
            if (producto) {
                let dataParseFiltrado = dataParse.filter(producto => producto.id !== id);
                await fs.promises.writeFile(this.ruta, JSON.stringify(dataParseFiltrado, null, 2), 'utf-8');
                console.log("Producto eliminado");

            } else {
                console.log("No existe ese producto que desea eliminar");
            }
        } catch (error) {
            console.log("Error lectura");
        }

    }

    async deleteProdInCarritoById(id, id_prod) {
        try {
            let data = await fs.promises.readFile(this.ruta, 'utf-8');
            let dataParse = JSON.parse(data);
            let dataIntact = dataParse.filter(carrito => carrito.id !== id);
            let carrito = dataParse.find(carrito => carrito.id === id);
            
            if (carrito.productos) {
                let carritoFiltrado = carrito.productos.filter(producto => producto.id !== id_prod);
                
                let obj = { id: id, timestamp: carrito.timestamp, productos: carritoFiltrado };
                
                let arrayOrdenado = [ ...dataIntact, obj ]
                arrayOrdenado.sort((a, b) => a.id - b.id)
                await fs.promises.writeFile(this.ruta, JSON.stringify(arrayOrdenado, null, 2));
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




