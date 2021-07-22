const mongoose = require("mongoose");


const MedicoSchema = new mongoose.Schema({
  email: String,
  nome: String,
  cognome: String,
  cFiscale: String,
  indirizzo: String,
  telefono: String,
  password: String
})

const Medico = mongoose.model('Medico', MedicoSchema);

module.exports = Medico;
