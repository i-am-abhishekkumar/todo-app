import { createContext, useEffect, useState } from "react";
import BACKEND_URL from "../api/url";

export const NoteContext = createContext();

export const NoteProvider=({children})=>{
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

// fetch all notes
const getNotes = async() => {
    const token = localStorage.getItem('token');
    if (!token) {
        setNotes([]);
        setLoading(false);
        return;
    }
    
    setLoading(true);
    try {
        const response = await BACKEND_URL.get("/get-notes");
        setNotes(response.data.notes || []);
    } catch (error) {
        console.error("Error fetching notes:", error);
        setNotes([]);
    } finally {
        setLoading(false);
    }
}

// Clear notes (for logout)
const clearNotes = () => {
    setNotes([]);
    setLoading(false);
}

// Listen for token changes and refetch notes
useEffect(()=>{
    const token = localStorage.getItem('token');
    if (token) {
        getNotes();
    } else {
        clearNotes();
    }
    
    // Listen for storage changes (when token is added/removed)
    const handleStorageChange = (e) => {
        if (e.key === 'token') {
            if (e.newValue) {
                getNotes();
            } else {
                clearNotes();
            }
        }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom event when token changes in same tab
    const handleTokenChange = () => {
        const currentToken = localStorage.getItem('token');
        if (currentToken) {
            getNotes();
        } else {
            clearNotes();
        }
    };
    
    window.addEventListener('tokenChanged', handleTokenChange);
    
    return () => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('tokenChanged', handleTokenChange);
    };
},[])

// create a note
const createNote = async(note) => {
    const res=await BACKEND_URL.post("/create-note",note)
    setNotes([res.data.note,...notes])
}

// update a note
const updateNote = async(id, updateNote) => {
    const res=await BACKEND_URL.put(`/update-note/${id}`,updateNote)
    setNotes(notes.map((note)=>(note._id===id ? res.data.note : note)))
}

// delete a note
const deleteNote = async(id) => {
    await BACKEND_URL.delete(`/delete-note/${id}`)
    setNotes(notes.filter((note)=>(note._id!==id)))
}

return(
    <NoteContext.Provider value={{notes,loading,createNote,updateNote,deleteNote,getNotes,clearNotes}}>
        {children}
    </NoteContext.Provider>
)
}