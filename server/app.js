const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 3000;
//da controllare
// var cittadino = document.getElementById("cittadino").name;
// var medico = document.getElementById("medico").name;
// var datore = document.getElementById("datore_di_lavoro").name;
//
// console.log(cittadino);
// console.log(medico);
// console.log(datore);

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//connessione al database mongoose
mongoose.connect("mongodb+srv://peppe:peppe@cluster0.nafti.mongodb.net/TamponatiDB",{ useNewUrlParser: true },{ useUnifiedTopology: true });

//Routes
app.use('/', require('./routes/index.js'));
app.use('/login.html', require('./routes/login.js'));



app.get("/seleziona_utente.html", (req,res) =>{
  res.sendFile(__dirname + "/view/seleziona_utente.html");
})


//ROTTE PER LE PAGINE DI REGISTRAZIONE
app.get("/registrazione_cittadino.html", (req,res)=>{
  res.sendFile(__dirname + "/view/registrazione_cittadino.html")
})

app.get("/registrazione_medico.html", (req,res)=>{
  res.sendFile(__dirname + "/view/registrazione_medico.html")
})

app.get("/registrazione_datore_di_lavoro.html", (req,res)=>{
  res.sendFile(__dirname + "/view//registrazione_datore_di_lavoro.html")
})


//ROTTE PER CONVENZIONAMENTI LAB
app.get("/convenzionati.html", (req,res) =>{
  res.sendFile(__dirname + "/view/convenzionati.html");
})

app.listen(port, () => {
  console.log("Il Server è stato aperto alla porta: " + port);
});


//REGISTRAZIONE MEDICO
app.post("/registrazione_medico.html", (req,res)=>{
  let email = req.body.email;
  let nome = req.body.nome;
  let cognome = req.body.cognome;
  let codiceFiscale = req.body.codFiscale;
  let indirizzo = req.body.indirizzo;
  let telefono = req.body.telefono;
  let password = req.body.password;

  if(!email || !nome || !cognome || !codiceFiscale || !indirizzo || !telefono || !password){
    res.sendFile(__dirname + "/view/seleziona_utente.html");
  } else {
      res.send("Registrazione presa in carico: "+"<br>"+email +"<br>"+ nome +"<br>"+ cognome +"<br>"+ codiceFiscale +"<br>"+ indirizzo +"<br>"+ telefono +"<br>"+ password);
  }
})


//REGISTRAZIONE DATORE DI LAVORO

app.post("/registrazione_datore_di_lavoro.html", (req,res)=>{
  let email = req.body.email;
  let nome = req.body.nome;
  let cognome = req.body.cognome;
  let nomeAzienda = req.body.nome_azienda;
  let piva = req.body.pIva;
  let indirizzo = req.body.indirizzo;
  let telefono = req.body.telefono;
  let password = req.body.password;

  if(!email || !nome || !cognome || !codiceFiscale || !indirizzo || !telefono || !password){
    res.sendFile(__dirname + "/view/seleziona_utente.html");
  } else {

  }
})

//REGISTRAZIONE CITTADINO
app.post("/registrazione_cittadino.html", (req,res)=>{
  const cittadinoModel = require('./models/cittadino');
  let email = req.body.email;
  let nome = req.body.nome;
  let cognome = req.body.cognome;
  let dataDiNascita = req.body.data;
  let codiceFiscale = req.body.codFiscale;
  let indirizzo = req.body.indirizzo;
  let telefono = req.body.telefono;
  let password = req.body.password;


  if(!email || !nome || !cognome || !codiceFiscale || !indirizzo || !telefono || !password){
    res.sendFile(__dirname + "/view/seleziona_utente.html");
  } else {
    const cit = new cittadinoModel({email, nome, cognome, cFiscale: codiceFiscale, indirizzo, telefono, password});

    cit.save(function (err) {
      if (err) return console.log(err);
    });
    res.sendFile(__dirname+ "/view/login.html");
}})
