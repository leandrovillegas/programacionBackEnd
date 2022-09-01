const { sqlite } = require('./db/js/SQLiteDB.js')
const { options } = require('./db/js/mariaDB.js')
const knex = require('knex').knex(options)
const knexSQL = require('knex').knex(sqlite)




//Creacion de tablas para cada base 

const crearTablaProd = async (nombreTabla) => {
    try {
        await knex.schema.createTable(nombreTabla, table => {
            table.increments('id').primary()
            table.string('title')
            table.decimal('price')
            table.string('thumbnail')
        })
        console.log('Tabla Creada con exito')
    } catch (error) {
        console.log(error)
    }
}
crearTablaProd('productos')


const crearTablaMsj = async (nombreTabla) => {
    try {
        await knexSQL.schema.createTable(nombreTabla, table => {
            table.increments('id').primary()
            table.string('email')
            table.string('mensaje')
            table.date('fyh')
        })
        console.log('Tabla Creada con exito')
    } catch (error) {
        console.log(error)
    }
}
crearTablaMsj('mensajes')


//Datos de prueba
const prod = [
    {
        "title": "Compas",
        "price": 200.17,
        "thumbnail": "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678066-compas-256.png",
        "id": 1
    },
    {
        "title": "Globo",
        "price": 300.17,
        "thumbnail": "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/globe-256.png",
        "id": 2
    },
    {
        "title": "Calculadora",
        "price": 100.17,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
        "id": 3
    }
]
const mensaj =
    [
        {
            "email": "SERVER",
            "fyh": "18/08/2022",
            "mensaje": "Hola",
            "id": 1
        },
        {
            "email": "SERVER",
            "fyh": "18/08/2022",
            "mensaje": "Bienvenido al chat",
            "id": 2
        }

    ]

//Popular tablas con esos datos

const insert = async (producto) => {
    try {

        knex('productos').insert(producto)
            .then(resp => console.log(resp))
            .catch(err => console.log(err))
            .finally(() => knex.destroy())

    } catch (error) {

        console.log(error);
    }
}
insert(prod)

const insertMsj = async (msj) => {
    try {

        knex('mensajes').insert(msj)
            .then(resp => console.log(resp))
            .catch(err => console.log(err))
            .finally(() => knex.destroy())

    } catch (error) {

        console.log(error);
    }
}

insertMsj(mensaj)
