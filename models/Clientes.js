const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Clientes = new Schema ({
    nome: { type: String, required: true},
    sobrenome: { type: String, required: true},
    telefone : { type: Number, required: true},
    cidade : { type: String },
    endereco : { type: String },
    cpf: { type: Number},
    date: {type: Date, default: Date.now()}
})

mongoose.model("Clientes", Clientes)