const mongoose = require("mongoose");


const DatoreDiLavoroSchema = new mongoose.Schema({
  email: String,
  nome: String,
  cognome: String,
  nomeAzienda: String,
  pIva: String,
  indirizzo: String,
  telefono: String,
  password: String
})

const DatoreDiLavoro = mongoose.model('DatoreDiLavoro', DatoreDiLavoroSchema);

module.exports = DatoreDiLavoro;
