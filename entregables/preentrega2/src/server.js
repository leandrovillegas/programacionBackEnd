const express = require('express');
require('dotenv').config()
//Inicializacion de los Routers a utilizar//
const app = express();
const routerProductos = require('../routes/productosRoute.js');
const routerCarritos = require('../routes/carritosRoute.js');

//Config Basica//
const port = process.env.PORT || 8080;

app.use(express.json())
//app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use('/api/productos', routerProductos)
app.use('/api/carritos', routerCarritos)


app.listen(port, error => {
    if (error) {
        throw new Error(`Erron on server: ${err}`)
    }
    console.log(`Server is running on port ${port}`)
})




