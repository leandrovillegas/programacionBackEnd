const contenedorFireDB = require('../../contenedores/ContenedorFireDB.js')

class CarritosDaoFireDB extends contenedorFireDB {
    constructor() {
        super('carritos')
    }
    async saveCarrito (carrito)  {
        try {
            const doc = this.colleccion.doc()
            await doc.create({
                timestamp: this.admin.firestore.FieldValue.serverTimestamp(),
                productos: [],
            })
        } catch (err) {
            throw new Error(`Error al guardar la información: ${err}`)
        }
    }

    async addProdInCarrito  (id_carrito, prod)  {
        try {
            const carro = await this.getById(id_carrito)
            if (carro) {
                const producto = await productosDao.getById(prod.id)
                if (producto.name) {
                    carro.prod.push({
                        ...prod
                    })
                    await this.update(id_carrito, carro)
                    return carro
                } else {
                    return 'Producto no encontrado'
                }
            } else {
                return 'Carrito no encontrado'
            }
        } catch (err) {
            throw new Error(`Error al guardar la información: ${err}`)
        }
    }

    deleteProdInCarritoById = async (id_carrito, id_prod) => {
        try {
            const carro = await this.getById(id_carrito)
            if (carro) {
                const found = carro.productos.find(element => element.id == id_prod)
                if (found) {
                    const deleteProducto = carro.productos.filter(element => element.id != id_prod)
                    carro.productos = deleteProducto
                    await this.update(id_carrito, carro)
                    return carro
                } else {
                    return 'Producto no encontrado'
                }
            } else {
                return 'Carrito no encontrado'
            }
        } catch (err) {
            throw new Error(`Error al guardar la información: ${err}`)
        }
    }
}
module.exports = CarritosDaoFireDB
