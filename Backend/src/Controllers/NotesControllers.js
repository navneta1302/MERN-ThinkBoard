import Note from "../Models/Note.js";

export async function getNote(req,res) {
    try{
        const note=await Note.find().sort({createdAt:-1});
        res.status(200).json(note);
    }
    catch(error){
        console.log("Error in getNote Controller",error);
        res.status(500).json("Internal Server Error");
    }
};

export async function getNoteById(req,res) {
    try{
        const note=await Note.findById(req.params.id)
        if(!note) return res.status(404).json({message:"Note not Found"})
        res.json(note);
    }
    catch(error){
        console.log("Error in getNote Controller",error);
        res.status(500).json("Internal Server Error");
    }
};

export async function createNote(req,res) {
    try{
        const {title,content}=req.body;
        const note=new Note({title,content});
        const savedNote=await note.save();
        res.status(201).json(savedNote);
    }
    catch(error){
        console.log("Error in createNote Controller",error);
        res.status(500).json("Internal Server Error");
    }
  };

export async function updateNote(req,res) {
    try{
        const {title,content}=req.body;
        const updatedNote=await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true},);
        if(!updatedNote) return res.status(404).json({message:"Note not Found"});
        res.status(200).json(updatedNote);
    }  catch(error){
        console.log("Error in updateNote Controller",error);
        res.status(500).json("Internal Server Error");
    }
};

export async function deleteNote(req,res) {
    try{
        const deletedNote=await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) return res.status(404).json({message:"Note not Found"});
        res.status(200).json({message:"Deleted Note Successfully"});
    }  catch(error){
        console.log("Error in deleteNote Controller",error);
        res.status(500).json("Internal Server Error");
    }
};
