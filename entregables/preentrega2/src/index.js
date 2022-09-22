let productosDao
let carritosDao
switch (process.env.DB_HOST) {
    case 'FS':
        const ProductosDaoArchivo = require('./daos/productos/ProductosDaoArchivo')
        const CarritosDaoArchivo = require('./daos/carritos/CarritosDaoArchivo')
        productosDao = new ProductosDaoArchivo()
        carritosDao = new CarritosDaoArchivo()
        break;

    case 'MongoDB':
        const ProductosDaoMongoDB = require('./daos/productos/ProductosDaoMongoDB')
        const CarritosDaoMongoDB = require('./daos/carritos/CarritosDaoMongoDB')
        productosDao = new ProductosDaoMongoDB()
        carritosDao = new CarritosDaoMongoDB()
        break;

    case 'FireDB':
        const ProductosDaoFireDB = require('./daos/productos/ProductosDaoFireDB')
        const CarritosDaoFireDB = require('./daos/carritos/CarritosDaoFireDB')
        productosDao = new ProductosDaoFireDB()
        carritosDao = new CarritosDaoFireDB()
        break
    default:
        break;
}


module.exports = { productosDao, carritosDao }