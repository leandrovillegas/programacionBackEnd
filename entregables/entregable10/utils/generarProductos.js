const { faker } = require('@faker-js/faker');
const Producto = require('../classes/Producto.js')

generarProductos = () => {
	const productos = [];
	for (let i = 0; i < 5; i++) {
		const producto = new Producto(
			faker.random.numeric(),
			faker.commerce.productName(),
			faker.commerce.price(100, 200, 0),
			faker.image.imageUrl()
		);
		productos.push(producto);
	}
	return productos;
};

module.exports = { generarProductos };