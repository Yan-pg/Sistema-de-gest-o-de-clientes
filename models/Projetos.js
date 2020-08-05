const mongoose = require("mongoose")
const Schema = mongoose.Schema

const projetos = new Schema({
    nome: { type: String, required: true },
    descricao: { type: String, },
    servicoGrafico: { type: String },
    status: { type: String, default: "Em andamento" },
    logoMarca: {type: Number, default: 0},
    midiasSociais: {type: Number, default: 0},
    cartaoDeVisita: {type: Number, default: 0},
    panfletos: {type: Number, default: 0},
    valorTotal: {type: Number, default: 0},
    pago: { type: String, required: true },
    cliente: { type: Schema.Types.ObjectId, ref: "Clientes", required: true },
    data: { type: Date, default: Date.now() },
})
mongoose.model("Projetos", projetos)

