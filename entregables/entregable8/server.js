const express = require('express');
const Contenedor = require('./contenedor');
const prodDB = new Contenedor('productos');
const msjDB = new Contenedor('mensajes');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');


const app = express();
const port = 4000 || process.env.PORT;
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))



io.on('connection', async (socket) => {
    console.log("Usuario conectado");
    const mensajes = await msjDB.getAllMsj();
    const productos = await prodDB.getAllProd();
    const data = { mensajes, productos }
    socket.emit('mensaje-servidor', data)


    socket.on('mensaje-nuevo', async (mensaje) => {
        msjDB.saveInSQLite(mensaje);

        io.sockets.emit('mensaje-servidor', {
            mensajes: await msjDB.getAllMsj(),
            productos: await prodDB.getAllProd()
        })
    })

    socket.on('producto-nuevo', async (producto) => {
        prodDB.saveInMariaDb(producto);
        io.sockets.emit('mensaje-servidor', {
            mensajes: await msjDB.getAllMsj(),
            productos: await prodDB.getAllProd()
        })
    })
})

httpServer.listen(port, error => {
    if (error) {
        throw new Error(`Erron on server: ${err}`)
    }
    console.log(`Server is running on port ${port}`)
})




