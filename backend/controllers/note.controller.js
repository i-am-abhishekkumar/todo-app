import mongoose from "mongoose";
import Note from "../models/note.model.js";

export const createNote=async(req,res)=>{
    try{
          const {title,content}=req.body;
          if(!title || !content){
            return res.status(400).json({message:"Title and content are required"});
          }
          // Associate note with the authenticated user
          const newNote=new Note({
            title,
            content,
            user: req.user.id
          });
            await newNote.save();
            res.status(201).json({message:"Note created successfully",note:newNote});
    }
    catch(error){
        res.status(500).json({message:"Internal server error", error: error.message});
    }
}
export const getNotes=async(req,res)=>{
    try{
        // Only get notes belonging to the authenticated user
        const notes=await Note.find({ user: req.user.id }).sort({createdAt:-1});
        res.status(200).json({notes});
    }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
  }
  export const updateNote=async(req,res)=>{
    try{
        const {id}=req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"Invalid note ID"});
        }
        const {title,content}=req.body;
        const updatedData={};
        if(title) updatedData.title=title;
        if(content) updatedData.content=content;
         if (Object.keys(updatedData).length === 0) {
            return res.status(400).json({ message: "Please provide title or content to update" });
        }
        // Find note and verify it belongs to the user
        const note = await Note.findById(id);
        if(!note){
            return res.status(404).json({message:"Note not found"});
        }
        // Check if note belongs to the authenticated user
        if(note.user.toString() !== req.user.id){
            return res.status(403).json({message:"Not authorized to update this note"});
        }
        const updatedNote=await Note.findByIdAndUpdate(id,updatedData,{new:true});
        res.status(200).json({message:"Note updated successfully",note:updatedNote});
    }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
  }
  export const deleteNote=async(req,res)=>{
    try{
        const {id}=req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"Invalid note ID"});
        }
        // Find note and verify it belongs to the user
        const note = await Note.findById(id);
        if(!note){
            return res.status(404).json({message:"Note not found"});
        }
        // Check if note belongs to the authenticated user
        if(note.user.toString() !== req.user.id){
            return res.status(403).json({message:"Not authorized to delete this note"});
        }
        const deletedNote=await Note.findByIdAndDelete(id);
        res.status(200).json({message:"Note deleted successfully"});
    }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
  }
  export const getNote=async(req,res)=>{
    try{
        const {id}=req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"Invalid note ID"});
        }
        const note=await Note.findById(id);
        if(!note){
            return res.status(404).json({message:"Note not found"});
        }
        // Check if note belongs to the authenticated user
        if(note.user.toString() !== req.user.id){
            return res.status(403).json({message:"Not authorized to view this note"});
        }
        res.status(200).json({note});
    }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
  }
