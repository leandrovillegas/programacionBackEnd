let productosDao
let carritosDao

switch ('fs') {
    case 'fs' :
        //const { default: ProductosDaoArchivo } =  await import('../daos/productos/ProductosDaoArchivo.js')
        const ProductosDaoArchivo = require('../daos/ProductosDao/ProductosDaoArchivo.js')
        productosDao = new ProductosDaoArchivo()
        break;

    default:
        break;
}


module.exports = {productosDao}