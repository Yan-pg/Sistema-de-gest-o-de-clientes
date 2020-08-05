const router = require("express").Router()
const mongoose = require("mongoose")
require("../models/Clientes")
const Clientes = mongoose.model("Clientes")
require("../models/Projetos")
const Projetos = mongoose.model("Projetos")
const {eAdmin} = require("../helpers/eAdmin")


router.get("/", eAdmin,(req, res) => {
    Clientes.find().sort({date:'desc'}).lean().then((clientes) => {
        res.render("clientes/show", {clientes: clientes})
    }).catch((err) => {
        console.log("Ocorreu um erro ao mostras todos os clientes: "+err)
    })
})
router.get("/more/:id", eAdmin, (req, res) => {
    Clientes.findOne({_id: req.params.id}).lean().then((cliente) => {
        if(cliente) {
            Projetos.find({cliente: cliente._id}).lean().then((projeto) => {
                res.render("clientes/more", {projeto: projeto, cliente: cliente})
            }).catch((err) => {
                console.log("Ocorreu um erro ao encntrar o projeto "+err)
            })
        }else{
            res.send("Ocorreu um erro ao encontar o cliente")
        }
    }).catch((err) => {
        console.log("Ocorreu um erro ao encontra o clinete 2 "+err)
    })
})
router.get("/criar", eAdmin,(req, res) => {
    res.render("clientes/add")
})
router.post("/new", eAdmin,(req, res) => {

    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido !"})
    }

    if(!req.body.sobrenome || typeof req.body.sobrenome == undefined || req.body.sobrenome == null){
        erros.push({texto: "Sobrenome inválido !"})
    }

    if(!req.body.telefone || typeof req.body.telefone == undefined || req.body.telefone == null){
        erros.push({texto: "Telefone inválido !"})
    }

    if(req.body.nome.length < 2) erros.push({texto: "Nome do cliente muito pequeno. Tente outro."})

    if(erros.length > 0) res.render("clientes/add", {erros: erros})

    else {
        const newCliente = new Clientes ({
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            telefone: req.body.telefone,
            cidade: req.body.cidade,
            endereco: req.body.endereco,
            cpf: req.body.cpf,
            cliente: req.body.cliente
        })
        newCliente.save().then(() => {
            res.render("success-erros/success-cliente")
        }).catch((err) => {
            res.render("success-erros/erro-cliente")
            res.send("Ocorreu um erro ao salvar "+err)
        })
    }
})
router.get("/edit/:id", eAdmin,(req, res) => {

    Clientes.findOne({_id: req.params.id}).lean().then((cliente) => {
        res.render("clientes/edit", {cliente: cliente})
    }).catch((err) => {
        console.log("Ocorreu um erro ao acher o id do cliente  "+err)
    })
})
router.post("/edit", eAdmin,(req, res) => {
    Clientes.findOne({ _id: req.body.id }).then((cliente) => {
        cliente.nome = req.body.nome,
        cliente.sobrenome = req.body.sobrenome,
        cliente.telefone = req.body.telefone,
        cliente.cidade = req.body.cidade,
        cliente.endereco = req.body.endereco,
        cliente.cpf = req.body.cpf

        cliente.save().then(() => {
            res.render("success-erros/success-cliente")
        }).catch((err) => {
            res.render("success-erros/erro-cliente")
            console.log("ocorreu um erro "+err)
        })
    }).catch((err) => {
        console.log("Ocorreu um erro  "+err)
    })
})
router.post("/delete", eAdmin,(req, res) => {
    Clientes.deleteOne({_id: req.body.id }).then(() => {
        res.render("success-erros/success-cliente")
    }).catch((err) => {
        res.render("success-erros/erro-cliente")
    })
})

module.exports = router