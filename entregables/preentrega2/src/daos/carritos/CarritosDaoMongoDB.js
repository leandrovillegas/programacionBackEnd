const ContenedorMongoDB = require('../../contenedores/contenedorMongoDb.js')
const carritosModel = require('../../../models/carritosModel.js')

class CarritosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(carritosModel)
    }

    async saveCarrito(carrito) {
        try {
            console.log()
            let createCarrito = new this.model(carrito)
            await createCarrito.save()
            return createCarrito
        } catch (err) {
            throw new Error(`Error al guardar la información: ${err}`)
        }
    }



    async addProdInCarrito(id_carrito, prod) {
        try {

            let carro = await this.model.findOne({
                _id: id_carrito
            });
            if (carro) {
                await this.model.findOneAndUpdate(
                    { _id: id_carrito },
                    {
                        $push: { productos: prod }
                    })
                return carro
            } else {
                return "Elemento no encontrado"
            }
        } catch (err) {
            throw new Error(`Error al actualizar: ${err}`)
        }
    }


    async deleteProdInCarritoById(id_carrito, id_prod) {
        try {

            let carro = await this.model.findOne({
                _id: id_carrito
            });
            if (carro) {
                console.log(carro)
                await this.model.findOneAndUpdate(
                    { _id: id_prod },
                    {
                        $pullAll: {
                            productos: [{ _id: id_prod }]
                        }
                    }
                );
                return 'Producto eliminado'
            } else {
                return "Elemento no encontrado"
            }



        } catch (err) {
            throw new Error(`Error al eliminar: ${err}`)
        }
    }
}

module.exports = CarritosDaoMongoDB