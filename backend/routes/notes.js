const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
//get all notes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "some error occured" });
  }
});
//add a new note
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("Description", "Description Must be atleast 5 characters").isLength(),
  ],
  async (req, res) => {
    try {
        const {title,description,tag}=req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note =new Note({
        title,description,tag,user:req.user.id
      })
      const savenote=await note.save()
      res.json(savenote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ error: "some error occured" });
    }
  }
);



router.put(
  "/updatenote/:id",
  fetchuser,
  async (req, res) => {
    try {
        const {title,description,tag}=req.body;
        const newNote={};
        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag};

        let note= await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}
        if(note.user.toString()!==req.user.id){
          return res.status(404).send("Not Allowed")
        }
        note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json({note});
        }
    catch (error) {
      console.error(error.message);
      res.status(500).send({ error: "some error occured" });
    }
  }
);


router.delete(
  "/deletenote/:id",
  fetchuser,
  async (req, res) => {
    try {
        const {title,description,tag}=req.body;
        
//find the note too be deleted
        let note= await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}
        // allow deletion if user owns this note
        if(note.user.toString()!==req.user.id){
          return res.status(404).send("Not Allowed")
        }
        note=await Note.findByIdAndDelete(req.params.id,)
        res.json({"Success" :"note deleted",note:note});
        }
    catch (error) {
      console.error(error.message);
      res.status(500).send({ error: "some error occured",note :note });
    }
  }
);

module.exports = router;
