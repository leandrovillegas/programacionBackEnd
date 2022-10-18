const express = require('express')
const handlebars = require("express-handlebars");
const { fork } = require("child_process");
require("dotenv").config();
const { argv, platform, version, memoryUsage, cwd, pid, execPath } = process;
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.set("view engine", "hbs");
app.set("views", "./views");

app.engine(
	"hbs",
	handlebars.engine({
		extname: ".hbs",
		defaultLayout: "",
		layoutsDir: "",
		partialsDir: __dirname + "/views/"
	})
);

app.get("/info", (req, res) => {
	const arguments = argv.slice(2).join(" || ");
    res.send(`
    <li>Argumentos de entrada: ${arguments.length ? arguments : "Ninguno"}</li>
    <li>Plataforma: ${platform}</li>
    <li>Versión de Node.js: ${version}</li>
    <li>Uso de la memoria RSS: ${memoryUsage}</li>
    <li>Ruta de ejecución: ${cwd}</li>
    <li>ID del proceso: ${pid}</li>
    <li>Carpeta del proyecto: ${execPath}</li>`)
    
});

app.get("/api/randoms", (req, res) => {
	let { cant } = req.query;
    const hola = "Hola"
	const random = fork("./utils/random", [cant],[hola]);
	random.send("start");
	random.on("message", obj => {
		res.send(obj);
	});
});



app.listen(port, error => {
    if (error) {
        throw new Error(`Erron on server: ${ err } `)
    }
    console.log(`Server is running on port ${ port } `)
})