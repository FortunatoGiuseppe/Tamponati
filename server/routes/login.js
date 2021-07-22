const express = require("express");
const router = express.Router();
var path = require("path");


router.get("/", (req,res) =>{
  res.sendFile(path.resolve("view/login.html"));
})

module.exports = router;
