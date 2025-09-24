import express from "express"
import {getNote,getNoteById,createNote,updateNote,deleteNote} from "../Controllers/NotesControllers.js";

const router=express.Router();

router.get("/",getNote);
router.get("/:id",getNoteById);
router.post("/",createNote);
router.put("/:id",updateNote);
router.delete("/:id",deleteNote);

export default router;
