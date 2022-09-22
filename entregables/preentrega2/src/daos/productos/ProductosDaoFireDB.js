const contenedorFireDB = require('../../contenedores/ContenedorFireDB.js')

class ProductosDaoFireDB extends contenedorFireDB {
    constructor() {
        super('productos')
    }

    async saveProd (element)  {
        try {
            const doc = this.colleccion.doc()
            await doc.create(element)
            return element
        } catch (err) {
            throw new Error(`Error al guardar la información: ${err}`)
        }
    }

    async updateProdById (producto)  {
        try {
            
            let found = await this.colleccion.doc(producto.id).get()
            if (found.data()) {
                await this.colleccion.doc(producto.id).update(producto);
                return producto
            } else {
                return "Producto no encontrado"
            }
        } catch (err) {
            throw new Error(`Error al actualizar la información: ${err}`)
        }
    }
}
module.exports = ProductosDaoFireDB