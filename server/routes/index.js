const express = require("express");
const router = express.Router();
var path = require("path")


router.get("/", (req,res) =>{
  res.sendFile(path.resolve("view/index.html"));
})

module.exports = router;
