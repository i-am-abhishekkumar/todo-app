import mongoose from "mongoose";
import Note from "../models/note.model.js";

export const createNote=async(req,res)=>{
    try{
          const {title,content}=req.body;
          if(!title || !content){
            return res.status(400).json({message:"Title and content are required"});
          }
          const newNote=new Note({title,content});
            await newNote.save();
            res.status(201).json({message:"Note created successfully",note:newNote});
    }
    catch(error){
        res.status(500).json({message:"Internal server error", error: error.message});
    }
}
export const getNotes=async(req,res)=>{
    try{
        const notes=await Note.find().sort({createdAt:-1});
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
        const updatedNote=await Note.findByIdAndUpdate(id,updatedData,{new:true});
        if(!updatedNote){
            return res.status(404).json({message:"Note not found"});
        }
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
        const deletedNote=await Note.findByIdAndDelete(id);
        if(!deletedNote){
            return res.status(404).json({message:"Note not found"});
        }
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
        res.status(200).json({note});
    }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
  }
