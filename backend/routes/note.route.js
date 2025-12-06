import express from 'express';
import { createNote,getNotes,getNote,updateNote,deleteNote}from "../controllers/note.controller.js"
import { authenticate } from '../middleware/auth.middleware.js';

const router=express.Router();

// All note routes require authentication
router.post('/create-note', authenticate, createNote)
router.get('/get-notes', authenticate, getNotes)
router.get('/get-note/:id', authenticate, getNote)
router.put('/update-note/:id', authenticate, updateNote)
router.delete('/delete-note/:id', authenticate, deleteNote)

export default router;