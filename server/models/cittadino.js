const mongoose = require("mongoose");


const CittadinoSchema = new mongoose.Schema({
  email: String,
  nome: String,
  cognome: String,
  cFiscale: String,
  indirizzo: String,
  telefono: String,
  password: String
})

const Cittadino = mongoose.model('Cittadino', CittadinoSchema);

module.exports = Cittadino;


// module.export = Cittadino;
