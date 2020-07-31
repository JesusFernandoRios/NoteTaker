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
  // .sendFile sends the selected file to the / url
  res.sendFile(path.join(__dirname,"/public/index.html"))
})

// Note Route
app.get('/notes', function (req, res){
  // this .sendfile sends the notes file to the url of /notes
  res.sendFile(path.join(__dirname,"/public/notes.html"))
})


////////API routes
app.get('/api/notes', function(req, res){
  // this send file returns the inforamtion stored in db/db.json file
  return res.sendFile(path.join(__dirname, "db/db.json"));
});

////////
app.post('/api/notes', function(req, res){

  //created variable that will read the information stored in db.json
  let savedNotes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));

  // this variable will store the information posted by the user
  let newNote = req.body;

  // this variable stored the length of the savednotes variable and converts it to a string
  let uniqueID = (savedNotes.length).toString();

  // this assigns the value of id to be = to uniqueID variable
  newNote.id = uniqueID;
  // pushing newNote to savedNotes var
  savedNotes.push(newNote);

  //writes to db.jason the the stored data of savedNotes
  fs.writeFileSync("db/db.json", JSON.stringify(savedNotes));

  //just a console log to show the note was saved
  console.log("Note saved to db.json. Content: ", newNote);
  
  //savedNotes converted to JSON
  res.json(savedNotes);
});
////////

app.delete('/api/notes/:id', function(req, res){
  //created variable that will read the information stored in db.json
  let savedNotes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));

  // this variable will hold the url parameter id
  let noteID = req.params.id;

  // variable set to 0 will update when new ids are created
  let newID = 0;

  //logging to make sure it deleted the note
  console.log(`Deleting note with ID ${noteID}`);

  // will only return if currNore id does not equal noteID
  savedNotes = savedNotes.filter(currNote => {

        return currNote.id != noteID;
    })
    

    for (currNote of savedNotes) {
        currNote.id = newID.toString();
        newID++;
    }

    // will write to db.json the data stored in savedNotes 
    fs.writeFileSync("db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
})
////////

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});


