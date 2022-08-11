const express = require('express');
const handlebars = require('express-handlebars');
const Contenedor = require('./contenedor');
const contenedor = new Contenedor('./productos.txt');


const app = express();
const port = 4000 || process.env.PORT;
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// app.engine(
//     'hbs',
//     handlebars.engine({
//         extname: '.hbs',
//         defaultLayout: 'listaproductos.hbs',
//         layoutsDir: __dirname + '/views',
//         partialsDir: __dirname + '/views/partials'
//     })
// )

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.static('public'))

app.get('/productos', async (req, res)=>{
    res.render('listaproductos', { listExist: true, list: await contenedor.getAll() })
})




// app.get('/productos', async (req, res) => {
//     res.render('listaproductos', { listExist: true, list: await contenedor.getAll() })
// })

app.post('/productos', async (req, res) => {
    try {
        const producto = req.body;
        console.log (producto)
        if (producto.title && producto.price && producto.thumbnail) {
             await contenedor.save(producto);
                res.redirect("/")

        }else{ 
            res.redirect("/")
        }
    } catch (error) {
        console.log(error)
    }


})




app.listen(port, error => {
    if (error) {
        throw new Error(`Erron on server: ${err}`)
    }
    console.log(`Server is running on port ${port}`)
})