// Carreganod módulos   
   
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require("body-parser")
var app = express()
const path = require("path")
const mongoose = require("mongoose")
const session = require("express-session")
var flash = require('connect-flash');
const usuarios = require("./routes/usuario")
const projetos = require("./routes/projetos")
const clientes = require("./routes/clientes")
const passport = require("passport")
require("./config/auth")(passport)
//const db = require("./config/db")
// Configurações
    // Sessão

        app.use(session({
            secret: "cursodenode",
            resave: true,
            saveUninitialized: true
        }))

        app.use(passport.initialize())
        app.use(passport.session())

        app.use(flash());
     
    // Middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash("sucess_msg")
            res.locals.error_msg = req.flash("error_msg")
            res.locals.error = req.flash("error")
            res.locals.user = req.user || null
            next()
        })

    // Body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())

    // Handlebars
    app.engine('handlebars', handlebars({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

    // Mongoose
    mongoose.Promise = global.Promise/*Evitar alguns erros que pode dar*/ 
    mongoose.connect("mongodb://localhost/projeto-big", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } ).then(function(){
        useNewUrlParser: true 
        console.log("Mongo concetado...")
    }).catch(function(err){
        console.log("Ha um erro ao se conectar "+err)
    })

    //  Public
        app.use(express.static(path.join(__dirname, 'public')))
        app.use((req, res, next) => {
            console.log("ola eu sou yan")
            next()
        })

    app.use('/', usuarios)
    app.use('/projetos', projetos)
    app.use('/clientes', clientes)
const PORT = process.env.PORT || 3000
app.listen(PORT, function(){
    console.log("Servidor rodando...")
})