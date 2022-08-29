const express = require('express');
const Contenedor = require('./clases/contenedor');
const productos = new Contenedor('./json/productos.json');
const mensajes = new Contenedor('./json/mensajes.json');

const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');


//Inicializacion de los Routers a utilizar//
const app = express();
const routerProductos = require('./routes/Productos');
const routerCarrito = require('./routes/Carritos');

//Config Basica//
const port = 8080 || process.env.PORT;
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)

// No se si lo voy a usar
// app.get('/', async (req, res) => {
//     res.render('listaproductos', { mensajes: await msjTxt.getAll(), productos: await prodTxt.getAll() })
// })


io.on('connection', async (socket) => {
    console.log("Usuario conectado")
    const msj = await mensajes.getAll();
    const prod = await productos.getAll();

    const data = {
        prod,
        msj
    }
    socket.emit('mensaje-servidor', data)
    // socket.on('producto-nuevo', (producto) => {
    //     prodTxt.save(producto)

    //     io.sockets.emit('mensaje-servidor', productos)
    // })


    socket.on('mensaje-nuevo', (mensaje) => {
        mensajes.saveMsj(mensaje)

        io.sockets.emit('mensaje-servidor', data)
    })
})

httpServer.listen(port, error => {
    if (error) {
        throw new Error(`Erron on server: ${err}`)
    }
    console.log(`Server is running on port ${port}`)
})




