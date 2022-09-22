const admin = require("firebase-admin");
const serviceAccount = require('../../utils/backend-coderhouse-e6acd-firebase-adminsdk-xq4rd-08d4127351.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

class ContenedorFireDB {
    constructor(colleccionName) {
        this.colleccion = db.collection(colleccionName)
    }

    async getAll () {
        try {
            let products = await this.colleccion.get()
            return products.docs.map(document => ({
                id: document.id,
                ...document.data()
            }))
        } catch (err) {
            throw new Error(`Error al obtener la información: ${err}`)
        }
    }

    

    async getById (id) {
        try {
            let product = await this.colleccion.doc(id).get()
            if (product.data()) {
                const response = {
                    id: product.id,
                    ...product.data()
                }
                return response
            } else {
                return 'Elemento no encontrado'
            }

        } catch (err) {
            throw new Error(`Error al obtener la información: ${err}`)
        }
    }

    async deleteAll ()  {
        try {
            await this.colleccion.doc().delete()
            return 'Elemento eliminados'
        } catch (err) {
            throw new Error(`Error al eliminar: ${err}`)
        }
    }

    async deleteById (id)  {
        try {
            let product = await this.colleccion.doc(id).get()
            if (product.data()) {
                await this.colleccion.doc(id).delete()
                return 'Elemento eliminado'
            } else {
                return "Elemento no encontrado"
            }

        } catch (err) {
            throw new Error(`Error al eliminar: ${err}`)
        }
    }

    async update (id, product)  {
        try {
            let found = await this.colleccion.doc(id).get()
            if (found.data()) {
                await this.colleccion.doc(id).update(product);
                return product
            } else {
                return "Producto no encontrado"
            }
        } catch (err) {
            throw new Error(`Error al actualizar la información: ${err}`)
        }
    }
}
module.exports = ContenedorFireDB