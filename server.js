// Variables for using Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");

//Setting up Express
const app = express();
const PORT = 3000;

//Setting up Data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// returns homepage
app.get("/", function(req, res){
  res.sendFile(path.join(__dirname,"/public/index.html"))
})

// Note Route
app.get('/notes', function (req, res){
  res.sendfile(path.join(__dirname,"/public/notes.html"))
})

//API routes
app.get('/api/notes', function(req, res){
  let info = req.body

  console.log(info)
})

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});


