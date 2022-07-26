const express = require('express');
const fs = require('fs');
const Contenedor = require('./contenedor');
const contenedor = new Contenedor('./productos.txt');
//import express  from 'express
const app = express();



app.get('/productos', (req, res) => {
    getAll();
    async function getAll() {
        try {
            let data = await fs.promises.readFile('./productos.txt', 'utf-8');
            let dataParse = JSON.parse(data);
            if (dataParse.length) {

                res.send(dataParse);
            } else {
                console.log("No hay productos");
            }

        } catch (error) {
            console.log(error);
        }
    }

})

app.get('/productoRandom', (req, res) => {

    getRandomObject();
    async function getRandomObject() {
        try {
            let data = await fs.promises.readFile('./productos.txt', 'utf-8');
            let dataParse = JSON.parse(data);

            if (dataParse.length) {
                const random = Math.floor(Math.random() * dataParse.length);
                res.send(dataParse[random]);
            } else {
                console.log("No hay productos");
            }

        } catch (error) {
            console.log(error);
        }
    }

})

const PORT = 4000;

const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto; ${server.address().port}`)
})
console.log(app)

server.on('error', err => console.log(err))