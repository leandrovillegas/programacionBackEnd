const express = require('express');
const fs = require('fs');
const Contenedor = require('./contenedor');
const contenedor = new Contenedor('./productos.txt');
//import express  from 'express
const app = express();



app.get('/productos', async (req, res) => {
  const arrayProductos= await contenedor.getAll();

  res.send(arrayProductos);

})

app.get('/productoRandom', async (req, res) => {

    const arrayProductos= await contenedor.getAll();
    const productoRandom = arrayProductos[Math.floor(Math.random() * arrayProductos.length)];
    
    res.send(productoRandom);
})

const PORT = 4000;

const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto; ${server.address().port}`)
})
console.log(app)

server.on('error', err => console.log(err))