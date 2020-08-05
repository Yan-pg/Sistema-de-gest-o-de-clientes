const router = require("express").Router()
const mongoose = require("mongoose")
require("../models/Projetos")
const Projetos = mongoose.model("Projetos")
require("../models/Clientes")
const Clientes = mongoose.model("Clientes")
const {eAdmin} = require("../helpers/eAdmin")

router.get("/", eAdmin,(req, res) => {
    Projetos.find({status: "Em andamento" }).populate("cliente").sort({data:'desc'}).lean().then((projetos) => {
        res.render("projetos/show", {projetos: projetos})
    }).catch((err) => {
        console.log("ocorreu um erro  "+err)
    })
})
router.get("/criar", eAdmin,(req, res) => {
    Clientes.find().lean().then((cliente) =>{
        res.render("projetos/projetosadd", {cliente: cliente})
    }).catch((err) => {
        console.log("Ocorreu um erro ao encontrar os clientes")
    })
})

router.post("/add", eAdmin,(req, res ) => {

    var erros = []
    
    if(! req.body.nome || req.body.nome == undefined || req.body.nome == null ) erros.push({texto: "Nome inválido !"})

    if(! req.body.valorTotal || req.body.valorTotal == undefined || req.body.valorTotal == null ) erros.push({texto: "Valor Total inválido !"})

    if(req.body.cliente == 0) erros.push({texto: "Precisa ter um cliente relacionado."})

    if(erros.length > 0) res.render("projetos/projetosadd", {erros: erros})

    else{
        const newProjeto = new Projetos({
            nome: req.body.nome,
            descricao: req.body.descricao,
            pago: req.body.pago,
            status: req.body.status,
            logoMarca: req.body.logoMarca,
            midiasSociais: req.body.midiasSociais,
            cartaoDeVisita: req.body.cartaoDeVisita,
            panfletos: req.body.panfletos,
            valorTotal: req.body.valorTotal,
            cliente: req.body.cliente,
            valor: req.body.valor
        })

        newProjeto.save().then(() => {
            res.render("success-erros/success-project")
        }).catch((err) => {
            res.render("success-erros/error-project")
            res.send("Ocorreu um erro ao salvar "+err)
        })
    }
})
router.get("/edit/:id", eAdmin,(req, res) => {
    Projetos.findOne({_id: req.params.id}).lean().then((projeto) => {
        Clientes.find().lean().then(() => {
            res.render("projetos/edit", {projeto: projeto})
        })
    }).catch((err) => {
        console.log("Ocorreu um erro ao encontrar a collection "+err)
    })
})
router.post("/editado", eAdmin,(req, res) => {
    Projetos.findOne({_id: req.body.id }).then((projetos) => {

    var erros = []
    
    if(! req.body.status || req.body.status == undefined || req.body.status == null ) erros.push({texto: "Status inválido !"})

    if(! req.body.pago || req.body.pago == undefined || req.body.pago == null ) erros.push({texto: "Pago inválido !"})

    else {
        projetos.nome = req.body.nome,
        projetos.descricao = req.body.descricao,
        projetos.servicoGrafico = req.body.servicoGrafico,
        projetos.logoMarca = req.body.logoMarca,
        projetos.midiasSociais = req.body.midiasSociais,
        projetos.cartaoDeVisita = req.body.cartaoDeVisita,
        projetos.panfletos = req.body.panfletos,
        projetos.valorTotal = req.body.valorTotal,
        projetos.pago = req.body.pago,
        projetos.status = req.body.status

        projetos.save().then(() => {
            res.render("success-erros/success-project")
        }).catch((err) => {
            res.render("success-erros/error-project")
            console.log("ocorreu um erro "+err)
        })

    }
    }).catch((err) => {
        console.log("Ocorreu um erro  "+err)
    })
})
router.post("/delete", eAdmin,(req, res) => {
    Projetos.deleteOne({_id: req.body.id}).then(() => {
        res.render("success-erros/success-project")
    }).catch((err) => {
        res.render("success-erros/error-project")
    })
})
router.get("/more/:id", eAdmin,(req, res) => {
    Projetos.findById({ _id: req.params.id}).populate("cliente").lean().then((projeto) => {
        res.render("projetos/more", {projeto: projeto})
    }).catch((err) => {
        console.log("Ocorreu um erro ao encontrar a collection "+err)
    })
})
router.get("/entregues", eAdmin,(req, res) => {
    Projetos.find({status: "Entregue" }).populate("cliente").sort({data:'desc'}).lean().then((projetos) => {
        res.render("projetos/showEntregues", {projetos: projetos})
    }).catch((err) => {
        console.log("ocorreu um erro  "+err)
    })
})
router.get("/entregues/criar", eAdmin,(req, res) => {
    Clientes.find().lean().then((cliente) =>{
        res.render("projetos/projetosadd", {cliente: cliente})
    }).catch((err) => {
        console.log("Ocorreu um erro ao encontrar os clientes")
    })
})
router.post("/entregues/add", eAdmin,(req, res ) => {

    var erros = []
    
    if(! req.body.nome || req.body.nome == undefined || req.body.nome == null ) erros.push({texto: "Nome inválido !"})

    if(! req.body.pago || req.body.pago == undefined || req.body.pago == null ) erros.push({texto: "Pago inválido !"})
    
    if(! req.body.valorTotal || req.body.valorTotal == undefined || req.body.valorTotal == null ) erros.push({texto: "Valor total inválido !"})

    if(req.body.cliente == 0) erros.push({texto: "Precisa ter um cliente relacionado."})

    if(erros.length > 0) res.render("projetos/projetosadd", {erros: erros})

    else{
        const newProjeto = new Projetos({
            nome: req.body.nome,
            descricao: req.body.descricao,
            servicoGrafico: req.body.servicoGrafico,
            pago: req.body.pago,
            status: req.body.status,
            cliente: req.body.cliente,
            valor: req.body.valor
        })

        newProjeto.save().then(() => {
            res.render("success-erros/success-project")
        }).catch((err) => {
            res.render("success-erros/error-project")
            res.send("Ocorreu um erro ao salvar "+err)
        })
    }
})
router.get("/entregues/edit/:id", eAdmin,(req, res) => {
    Projetos.findOne({_id: req.params.id}).lean().then((projeto) => {
        res.render("projetos/edit", {projeto: projeto})
    }).catch((err) => {
        console.log("Ocorreu um erro ao encontrar a collection "+err)
    })
})
router.post("/entregues/editado", eAdmin,(req, res) => {
    Projetos.findOne({_id: req.body.id }).then((projetos) => {
        projetos.nome = req.body.nome,
        projetos.descricao = req.body.descricao,
        projetos.servicoGrafico = req.body.servicoGrafico,
        projetos.pago = req.body.pago,
        projetos.status = req.body.status

        projetos.save().then(() => {
            res.render("success-erros/success-project")
        }).catch((err) => {
            res.render("success-erros/error-project")
            console.log("ocorreu um erro "+err)
        })
    }).catch((err) => {
        console.log("Ocorreu um erro  "+err)
    })
})
router.get("/entregues/more/:id", eAdmin,(req, res) => {
    Projetos.findById({ _id: req.params.id}).populate("cliente").lean().then((projeto) => {
        res.render("projetos/more", {projeto: projeto})
    }).catch((err) => {
        console.log("Ocorreu um erro ao encontrar a collection "+err)
    })
})
router.post("/entregues/delete", eAdmin,(req, res) => {
    Projetos.deleteOne({_id: req.body.id}).then(() => {
        res.render("projetos/showEntregues")
    }).catch((err) => {
        res.render("success-erros/success-project")
    })
})
router.get("/cancelados", eAdmin,(req, res) => {
    Projetos.find({status: "Cancelado" }).populate("cliente").sort({data:'desc'}).lean().then((projetos) => {
        res.render("projetos/showCancelados", {projetos: projetos})
    }).catch((err) => {
        console.log("ocorreu um erro  "+err)
    })
})
router.get("/cancelados/criar", eAdmin, (req, res) => {
    Clientes.find().lean().then((cliente) =>{
        res.render("projetos/projetosadd", {cliente: cliente})
    }).catch((err) => {
        console.log("Ocorreu um erro ao encontrar os clientes")
    })
})
router.post("/cancelados/add", eAdmin,(req, res ) => {

    var erros = []
    
    if(! req.body.nome || req.body.nome == undefined || req.body.nome == null ) erros.push({texto: "Nome inválido !"})

    if(! req.body.pago || req.body.pago == undefined || req.body.pago == null ) erros.push({texto: "Pago inválido !"})
    
    if(! req.body.valor || req.body.valor == undefined || req.body.valor == null ) erros.push({texto: "Valor inválido !"})

    if(req.body.cliente == 0) erros.push({texto: "Precisa ter um cliente relacionado."})

    if(erros.length > 0) res.render("projetos/projetosadd", {erros: erros})

    else{
        const newProjeto = new Projetos({
            nome: req.body.nome,
            descricao: req.body.descricao,
            servicoGrafico: req.body.servicoGrafico,
            pago: req.body.pago,
            status: req.body.status,
            cliente: req.body.cliente,
            valor: req.body.valor
        })

        newProjeto.save().then(() => {
            res.render("success-erros/success-project")
        }).catch((err) => {
            res.render("success-erros/error-project")
            res.send("Ocorreu um erro ao salvar "+err)
        })
    }
})
router.get("/cancelados/edit/:id", eAdmin,(req, res) => {
    Projetos.findOne({_id: req.params.id}).lean().then((projeto) => {
        res.render("projetos/edit", {projeto: projeto})
    }).catch((err) => {
        console.log("Ocorreu um erro ao encontrar a collection "+err)
    })
})
router.post("/cancelados/editado",eAdmin, (req, res) => {
    Projetos.findOne({_id: req.body.id }).then((projetos) => {
        projetos.nome = req.body.nome,
        projetos.descricao = req.body.descricao,
        projetos.servicoGrafico = req.body.servicoGrafico,
        projetos.pago = req.body.pago,
        projetos.status = req.body.status

        projetos.save().then(() => {
            res.render("success-erros/success-project")
        }).catch((err) => {
            res.render("success-erros/error-project")
            console.log("ocorreu um erro "+err)
        })
    }).catch((err) => {
        console.log("Ocorreu um erro  "+err)
    })
})
router.get("/cancelados/more/:id", eAdmin,(req, res) => {
    Projetos.findById({ _id: req.params.id}).populate("cliente").lean().then((projeto) => {
        res.render("projetos/more", {projeto: projeto})
    }).catch((err) => {
        console.log("Ocorreu um erro ao encontrar a collection "+err)
    })
})
router.post("/cancelados/delete", (req, res) => {
    Projetos.deleteOne({_id: req.body.id}).then(() => {
        res.render("projetos/showCancelados")
    }).catch((err) => {
        res.render("success-erros/success-project")
    })
})
module.exports = router