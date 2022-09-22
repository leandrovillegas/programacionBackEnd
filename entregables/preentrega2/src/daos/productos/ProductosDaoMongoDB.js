const ContenedorMongoDB = require('../../contenedores/contenedorMongoDb.js')
const productosModel = require('../../../models/productosModel.js')

class ProductosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(productosModel)
    }

    async saveProd(producto) {
        try {
            
            let createProducto = new this.model(producto)
            await createProducto.save()
            return createProducto 
        } catch (err) {
            throw new Error(`Error al guardar la información: ${err}`)
        }
    }

    async updateProdById(producto) {
        try {
            
            let product = await this.model.findOne({
                _id: producto.id
            });
            if (product) {
                await this.model.updateOne({
                    _id: producto.id
                }, {
                    $set: {
                        nombre: producto.nombre,
                        precio: producto.precio,
                        foto: producto.foto
                    }
                })
                return producto
            } else {
                return "Producto no encontrado"
            }
        } catch (err) {
            throw new Error(`Error al actualizar: ${err}`)
        }
    }

}
module.exports = ProductosDaoMongoDB