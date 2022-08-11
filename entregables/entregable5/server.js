const express = require('express');
const Contenedor = require('./contenedor');
const contenedor = new Contenedor('./productos.txt');


const app = express();
const port = 4000 || process.env.PORT;

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))


app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('public'))


app.get('/productos', async (req, res) => {
    let productos= await contenedor.getAll();
    let mensaje= 'Lista Productos con EJS by Leandro Villegas'
    res.render('layouts/index.ejs', {
        productos,
        mensaje
    })
})



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