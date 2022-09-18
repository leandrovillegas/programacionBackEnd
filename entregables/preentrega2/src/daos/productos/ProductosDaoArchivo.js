import ContenedorArchivo from "../../contenedores/contenedorArchivo.js"

class ProductosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super("./json/productos.json")
    }

    async saveProd(objeto) {
        try {
            console.log(objeto)
            let data = await fs.promises.readFile(this.ruta, 'utf-8');
            let dataParse = JSON.parse(data);
            if (dataParse.length) {
                await fs.promises.writeFile(this.ruta, JSON.stringify([...dataParse, { id: dataParse[dataParse.length - 1].id + 1, timestamp: Date.now(), ...objeto }], null, 2));
                return { status: 'Ok', code: 200, descripcion: "Producto agregado con exito" }
            } else {
                await fs.promises.writeFile(this.ruta, JSON.stringify([{ ...objeto, id: 1 }], null, 2));
                return { status: 'Ok', code: 200, descripcion: "Producto agregado con exito" }
            }


        } catch (error) {
            return { status: 'error', code: -4, descripcion: error }
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
                return { status: 'Ok', code: 200, descripcion: "Ese producto fue actualizado" }
            } else {
                return { status: 'error', code: -1, descripcion: "Ese proucto no existe" }
            }


        } catch (error) {
            return { status: 'error', code: -4, descripcion: error }

        }
    }
}

module.exports= ProductosDaoArchivo;