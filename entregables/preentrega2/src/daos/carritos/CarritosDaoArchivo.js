import ContenedorArchivo from "../../contenedores/contenedorArchivo.js"

class CarritosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super("./json/carrito.json")
    }

    async saveCarrito(objeto) {
        try {

            let data = await fs.promises.readFile(this.ruta, 'utf-8');
            let dataParse = JSON.parse(data);
            if (dataParse.length) {
                await fs.promises.writeFile(this.ruta, JSON.stringify([...dataParse, { id: dataParse[dataParse.length - 1].id + 1, timestamp: Date.now(), ...objeto }], null, 2));
                return { status: 'Ok', code: 200, descripcion: "Carrito agregado con exito" }
            } else {
                await fs.promises.writeFile(this.ruta, JSON.stringify([{ ...objeto, id: 1 }], null, 2));
                return { status: 'Ok', code: 200, descripcion: "Carrito agregado con exito" }
            }


        } catch (error) {
            return { status: 'error', code: -4, descripcion: error }
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


                return { status: 'Ok', code: 200, descripcion: "Ese carrito fue actualizado" }

            } else {
                return { status: 'error', code: -1, descripcion: "Ese carrito no existe" }

            }


        } catch (error) {
            return { status: 'error', code: -4, descripcion: error }
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

                let arrayOrdenado = [...dataIntact, obj]
                arrayOrdenado.sort((a, b) => a.id - b.id)
                await fs.promises.writeFile(this.ruta, JSON.stringify(arrayOrdenado, null, 2));
                return { status: 'Ok', code: 200, descripcion: "Eliminado con exito" }
            } else {
                return { status: 'error', code: -1, descripcion: "El producto que desea eliminar no se encuentra en la lista" }
            }

        } catch (error) {
            return { status: 'error', code: -4, descripcion: error }
        }

    }
}
module.exports= CarritosDaoArchivo;