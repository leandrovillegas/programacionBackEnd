const connectDB = require('./mongoDB')
connectDB()
class ContenedorMongoDB {
    constructor(model) {
        this.model = model
    }

    async saveUser(producto) {
        try {
            
            let createProducto = new this.model(producto)
            await createProducto.save()
            return createProducto 
        } catch (err) {
            throw new Error(`Error al guardar la información: ${err}`)
        }
    }
    async getAll() {
        try {
            let products = await this.model.find({})
            return products
        } catch (err) {
            throw new Error(`Error al obtener la información: ${err}`)
        }
    }

    async getById(id) {
        try {
            let elemento = await this.model.findOne({
                _id: id
            });
            if (elemento) {
                return elemento
            } else {
                return "Elemento no encontrado"
            }
        } catch (err) {
            throw new Error(`Error al obtener la información: ${err}`)
        }
    }

    async deleteAll() {
        try {
            await this.model.deleteMany({})
            return 'Elementos eliminados'
        } catch (err) {
            throw new Error(`Error al eliminar: ${err}`)
        }
    }

    async deleteById(id) {
        try {
            let element = await this.model.findOne({
                _id: id
            });
            if (element) {
                await this.model.deleteOne({
                    _id: id
                })
                return 'Elemento eliminado'
            } else {
                return "Elemento no encontrado"
            }
        } catch (err) {
            throw new Error(`Error al eliminar: ${err}`)
        }
    }

}

module.exports = ContenedorMongoDB
