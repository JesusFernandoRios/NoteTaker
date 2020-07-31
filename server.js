// Variables for using Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");

//Setting up Express
const app = express();
const PORT = 3000;

// Use a middleware to parse the JSON data
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
//what folder the browser can see
app.use(express.static("public"));





// returns homepage
app.get("/", function(req, res){
  res.sendFile(path.join(__dirname,"/public/index.html"))
})

// Note Route
app.get('/notes', function (req, res){
  res.sendFile(path.join(__dirname,"/public/notes.html"))
})





////////API routes
app.get('/api/notes', function(req, res){
  return res.sendFile(path.join(__dirname, "db/db.json"));
});

////////
app.post('/api/notes', function(req, res){
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

  let newNote = req.body;

  let uniqueID = (savedNotes.length).toString();

  newNote.id = uniqueID;
  savedNotes.push(newNote);

  fs.writeFileSync("db/db.json", JSON.stringify(savedNotes));
  console.log("Note saved to db.json. Content: ", newNote);
  res.json(savedNotes);
});
////////

app.delete('/api/notes/:id', function(req, res){
  let savedNotes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));

  let noteID = req.params.id;

  let newID = 0;

  console.log(`Deleting note with ID ${noteID}`);

  savedNotes = savedNotes.filter(currNote => {

        return currNote.id != noteID;
    })
    
    for (currNote of savedNotes) {
        currNote.id = newID.toString();
        newID++;
    }

    fs.writeFileSync("db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
})
////////

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});


