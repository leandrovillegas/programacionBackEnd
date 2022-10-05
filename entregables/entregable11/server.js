const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const logger = require('morgan')
const MongoStore = require('connect-mongo')
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(cookieParser(process.env.COOKIES_SECRET || '123456'));

// ------ Mongo Config
const mongoConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
app.use(session({
    secret: process.env.SESSION_SECRET || '123456',
    resave: true,
    ttl: 5,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/?retryWrites=true&w=majority`, mongoOptions: mongoConfig })
}))
// ---------FIN

// ----- Handlebars config 
/* app.set("view engine", "hbs");
app.set("views", "./views");


app.engine(
    "hbs",
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'login.hbs',
        layoutsDir: '',
        partialsDir: __dirname + '/views'
    })
); */
// ---------FIN


app.get('/index', async (req, res) => {

    console.log("Entro")
    if (req.session.username) {
        res.write(`<h1>Bienvenido ${req.session.username}</h1>`);
        res.end("<a href=" + "/logout" + ">Cerrar Sesion</a >");
    } else {
        res.sendFile(__dirname + '/public/login.html');
    }
})


app.post('/login', async (req, res) => {
    try {
        const { username } = req.body;
        req.session.username = username;
        console.log(username)
        res.redirect('/index');
    } catch (error) {
        res.send(error)
    }

})

app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return console.log(err);
        }
        res.redirect("/index");
    });
});



app.listen(port, error => {
    if (error) {
        throw new Error(`Erron on server: ${err}`)
    }
    console.log(`Server is running on port ${port}`)
})