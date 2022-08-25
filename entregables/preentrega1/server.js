const express = require('express');
const Contenedor = require('./contenedor');
const productos = new Contenedor('./productos.json');
const mensajes = new Contenedor('./mensajes.json');
const carrito = new Contenedor('./carrito.json');
const admin = true;
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const { Router } = express;


//Inicializacion de los Routers a utilizar//
const app = express();
const routerProductos = Router();
const routerCarrito = Router();

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




//Declaraciones de las rutas de productos

routerProductos.get('/', async (req, res) => {
    try {
        const arrayProductos = await productos.getAll();

        res.json(arrayProductos);
    } catch (error) {
        console.log(error)
    }

})

routerProductos.get('/:id', async (req, res) => {

    try {
        const arrayProductos = await productos.getAll();
        const notFound = { error: 'Ese producto no existe' };
        const { id } = req.params;
        if (arrayProductos[id - 1]) {
            res.json(arrayProductos[id - 1]);
            res.send(index)
        } else {
            res.json(notFound);
        }
    } catch (error) {
        console.log(error)
    }


})

routerProductos.post('/', async (req, res) => {

    try {
        const objetoProd = req.body;
        console.log(objetoProd)
        if (objetoProd.nombre && objetoProd.descripcion && objetoProd.precio && objetoProd.foto && objetoProd.codigo && objetoProd.stock && admin) {
            await productos.saveProd(objetoProd);
            const data = await productos.getAll();
            //res.json(data[data.length - 1]);
            res.redirect('/') // No se me ocurre como poder hacer para que no refresque pero que el socket lo tome...
        } else {
            if (!admin) {
                return { error: -1, descripcion: "Ruta /api/productos/ metodo POST no autorizado" }
            }
            console.log("Hubo un error")
            // res.redirect('/');
        }
    } catch (error) {
        console.log(error)
    }


})

routerProductos.patch('/:id', async (req, res) => {

    const { id } = req.params;

    const objetoProd = req.body;
    const respuesta = await productos.updateProdById({ ...objetoProd, id: parseInt(id) })
    res.json({ respuesta })

})

routerProductos.delete('/:id', (req, res) => {

    const { id } = req.params;

    try {
        if (admin) {
            productos.deleteById(parseInt(id));
        } else {
            return { error: -1, descripcion: "Ruta /api/productos/" + id + " metodo DELETE no autorizado" }
        }


    } catch (error) {
        console.log(error)
    }

})


//Declaraciones de las rutas de carrito


routerCarrito.get('/', async (req, res) => {
    try {
        const carritoCompra = await carrito.getAll();

        res.json(carritoCompra);
    } catch (error) {
        console.log(error)
    }

})

routerCarrito.get('/:id/productos', async (req, res) => {

    try {
        const carritoCompra = await carrito.getAll();
        const notFound = { error: 'Ese carrito no existe' };
        const { id } = req.params;
        if (carritoCompra[id - 1]) {
            res.json(carritoCompra[id - 1].productos);

        } else {
            res.json(notFound);
        }
    } catch (error) {
        console.log(error)
    }


})

routerCarrito.post('/', async (req, res) => {

    try {
        const objetoCarrito = req.body;

        if (objetoCarrito.productos) {
            await carrito.saveCarrito(objetoCarrito);
            const data = await carrito.getAll();
            res.json(data[data.length - 1].id);
        } else {
            console.log("Hubo un error")
        }
    } catch (error) {
        console.log(error)
    }


})

routerCarrito.post('/:id/productos', async (req, res) => {

    const { id } = req.params;
    const objetoProd = req.body;
    const respuesta = await carrito.addProdInCarritoById({ id: parseInt(id), ...objetoProd })
    res.json({ respuesta })

})

routerCarrito.delete('/:id/productos/:id_prod', (req, res) => {

    const { id } = req.params;
    const { id_prod } = req.params;

    try {
        carrito.deleteProdInCarritoById(parseInt(id), parseInt(id_prod));

    } catch (error) {
        console.log(error)
    }

})






io.on('connection', async(socket) => {
    console.log("Usuario conectado")
    const msj = await mensajes.getAll();
    const prod = await productos.getAll();

    const data ={
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




