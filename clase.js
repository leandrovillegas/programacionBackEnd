
//--------------Creacion de clase------------//
class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {

        return this.nombre + " " + this.apellido;
    }
    addMascotas(mascota) {
        this.mascotas.push(mascota);
    }
    countMascotas() {
        return this.mascotas.length
    }
    addBook(nombreL, autorL) {
        /*No se cual es sintacticamente correcto, ambos funcionan
        
        let libro = [];
        libro.nombre=nombreL;
        libro.autor=autorL;
        */
        let libro = {
            nombre: nombreL,
            autor: autorL

        };
        this.libros.push(libro);
    }

    getBookNames() {
        let bookNames = [];
        this.libros.forEach(element => {
            bookNames.push(element.nombre);
        });
        return bookNames;

    }
}

//--------------Creacion de objeto literal tipo libros------------//
const libros = [
    {
        nombre: "Harry Potter",
        autor: "Maria Elena Walsh"

    },
    {
        nombre: "Elige tu propia aventura",
        autor: "Draco Malfoy"

    }

];

//--------------Creacion de array de mascotas------------//
const mascotas = ["perro", "gato", "conejo", "serpiente"];

//--------------Etapa prueba------------//
let usuario = new Usuario("Leandro", "Villegas", libros, mascotas);

console.log(usuario.libros[0].nombre);

console.log(usuario.libros[1].nombre);

console.log(usuario.mascotas[0]);

console.log(usuario.getFullName());

usuario.addMascotas("saltamontes");

console.log(usuario.mascotas[4]);

usuario.addBook("Prueba", "Soy Yo");

console.log(usuario.libros[2].autor);

let bla = [];
bla.push(usuario.getBookNames());
bla.forEach(element => {
    console.log(element)
});
//--------------Fin Etapa prueba------------//