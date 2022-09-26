const express = require('express');
const handlebars = require("express-handlebars");
const Contenedor = require('./utils/contenedor');
const msj = new Contenedor('./data/mensajes.json');
const msjSave = new Contenedor('./data/mensajesSinNormalizar.json');
const { generarProductos } = require('./utils/generarProductos.js')
const productosGenerados = generarProductos();


///INICIALIZACION DE NORMALIZACION//

const { normalize, denormalize, schema } = require("normalizr");
const fs = require("fs");
const mensajesSinNormalizar = require("./data/mensajesSinNormalizar.json")
///FIN DE INICIALIZACION DE NORMALIZACION//

const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const port = process.env.PORT || 4000;

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

io.on('connection', async (socket) => {
    console.log("Usuario conectado");
    const mensajes = await msjSave.getAll();
    const data = { mensajes, productosGenerados }
    socket.emit('mensaje-servidor', data)


    socket.on('mensaje-nuevo', async (mensaje) => {

        mensajes.push(mensaje)
        await msjSave.saveMsj(mensaje);

        const authorSchema = new schema.Entity('author', {}, { idAttribute: 'email' });
        const commentSchema = new schema.Entity('mensaje');
        const messageSchema = [
            {
                author: authorSchema,
                mensaje: commentSchema
            }
        ];
        
        const normalizedMessages = normalize(mensajesSinNormalizar, messageSchema);
        
   
        fs.writeFileSync(
            "./data/mensajes.json",
            JSON.stringify(normalizedMessages.result)
        );


        io.sockets.emit('mensaje-servidor', {
            mensajes,productosGenerados
        })
    })

})

httpServer.listen(port, error => {
    if (error) {
        throw new Error(`Erron on server: ${err}`)
    }
    console.log(`Server is running on port ${port}`)
})