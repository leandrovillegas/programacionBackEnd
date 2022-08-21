const express = require('express');
const handlebars = require('express-handlebars');
const Contenedor = require('./contenedor');
const prodTxt = new Contenedor('./productos.json');
const msjTxt = new Contenedor('./mensajes.json');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const port = 4000 || process.env.PORT;
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'listaproductos.hbs',
        layoutsDir: __dirname + '/views'
    })
)
app.set('view engine', 'hbs')
app.set('views', './views')

app.get('/', async (req, res) => {
    res.render('listaproductos', { mensajes: await msjTxt.getAll(), productos: await prodTxt.getAll() })
})



io.on('connection', async(socket) => {
    console.log("Usuario conectado")
    const mensajes = await msjTxt.getAll();
    const productos = await prodTxt.getAll();
    
    const data ={
        productos,
        mensajes
    }
    socket.emit('mensaje-servidor', data)

    socket.on('producto-nuevo', (producto) => {
        prodTxt.save(producto)
        
        io.sockets.emit('mensaje-servidor', productos)
    })


    socket.on('mensaje-nuevo', (mensaje) => {
        msjTxt.saveMsj(mensaje)

        io.sockets.emit('mensaje-servidor', mensajes)
    })
})

httpServer.listen(port, error => {
    if (error) {
        throw new Error(`Erron on server: ${err}`)
    }
    console.log(`Server is running on port ${port}`)
})




