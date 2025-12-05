import express from 'express';
import { createNote,getNotes,getNote,updateNote,deleteNote}from "../controllers/note.controller.js"

const router=express.Router();

router.post('/create-note',createNote)
 router.get('/get-notes',getNotes)
 router.get('/get-note/:id',getNote)
 router.put('/update-note/:id',updateNote)
 router.delete('/delete-note/:id',deleteNote)
export default router;