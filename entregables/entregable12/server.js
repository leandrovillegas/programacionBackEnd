const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const logger = require('morgan')
const MongoStore = require('connect-mongo')
const bcrypt = require('bcrypt')
require("dotenv").config();

const Usuarios = require('./userContenedor')
const usersModel = require('./usersSchema')
const users = new Usuarios(usersModel);

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
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 90000
    },
    store: MongoStore.create({ mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/?retryWrites=true&w=majority`, mongoOptions: mongoConfig })
}))

/*
app.use(session({
    secret: process.env.SESSION_SECRET || '123456',
    resave: true,
    ttl: 5,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/?retryWrites=true&w=majority`, mongoOptions: mongoConfig })
}))*/
app.use(passport.initialize());
app.use(passport.session());
// ---------FIN
// ----- Passport Middelware

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}


passport.use('login', new LocalStrategy(
   async (username, password, done) => {
        let arrayUsers= await users.getAll();
        console.log(arrayUsers)
        let user = arrayUsers.find(usuario => usuario.username === username)

        if (!user) {
            console.log("No es correcto el usuario")
            return done(null, false, { message: "No es correcto el usuario" })
        }
        if (user.password !== password) {
            console.log('Password incorrecto')
            return done(null, false, { message: 'Password incorrect' })
        }



        done(null, user)

    }
))



passport.use('signup', new LocalStrategy({
    passReqToCallback: true
}, async (req, username, password, done) => {

    let arrayUsers= await users.getAll();
    let user = await arrayUsers.find(user => user.username === username)
    console.log(user)
    if (user) {
        console.log(`El usuario ${username} ya existe`)
        return done(null, false, { message: 'User already exists' })
    }

    let newUser = {
        username,
        // password: createHash(password),
        password 
    }

    users.saveUser(newUser)
    return done(null, newUser.id)

}))

//////////////////   passport serialize   ///////

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

/////////////////////////////////////////////////


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

    console.log(req.user)
    if (req.session.username) {
        console.log("Index")
        res.write(`<h1>Bienvenid@ ${req.session.username}</h1>`);
        res.end("<a href=" + "/logout" + "><button>Cerrar Sesion</button></a >");
    } else {
        console.log("Reboto")
        res.sendFile(__dirname + '/public/login.html');
    }
})

app.get('/', async (req, res) => {

    res.redirect('/index');
})

/*
app.post('/login', async (req, res) => {
    try {
        const { username } = req.body;
        req.session.username = username;
        console.log(username)
        res.redirect('/index');
    } catch (error) {
        res.send(error)
    }

})*/

app.post('/login', passport.authenticate('login', {
    failureRedirect: '/loginfail',
}), (req, res) => {
    const { username } = req.body;
    req.session.username = username
    res.redirect('/index')
})

app.get('/login', (req, res) => {
    res.redirect('/login.html')

})

app.get('/loginfail', (req, res) => {
    res.redirect('/loginfail.html')

})
app.get('/signupfail',(req, res) => {

    res.redirect('/signupfail.html')
})

app.get('/signup', passport.authenticate('signup', {
    successRedirect: '/login',
    failureRedirect: '/signupfail',
}), (req, res) => {

    res.redirect('/login.html')
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