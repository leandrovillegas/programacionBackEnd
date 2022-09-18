const express = require('express');

//Inicializacion de los Routers a utilizar//
const app = express();
app.get();
//const routerProductos = require('../routes/productosRoute.js');
//const routerCarrito = require('../routes/carritosRoute.js');

//Config Basica//
const port = process.env.PORT || 8080;

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)


app.listen(port, error => {
    if (error) {
        throw new Error(`Erron on server: ${err}`)
    }
    console.log(`Server is running on port ${port}`)
})




