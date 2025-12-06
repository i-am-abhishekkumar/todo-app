import React, { useContext, useState } from 'react'
import { NoteContext } from '../context/NoteContext'

function Noteform() {
    const {createNote}=useContext(NoteContext)
    const [note,setNote]=useState({
        title:"",
        content:"",
        image: null
    })
    const [imagePreview, setImagePreview] = useState(null)

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNote({ ...note, image: file });
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleRemoveImage = () => {
        setNote({ ...note, image: null });
        setImagePreview(null);
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        if(!note.title || !note.content)return
        createNote(note)
        setNote({title:"",content:"", image: null})
        setImagePreview(null)
    }
  return (
    <div className="max-w-xl mx-auto mt-10 bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center text-blue-400 mb-6">Create a New Note</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter title..."
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
        />
        <textarea
          placeholder="Write your note here..."
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
          rows="5"
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
        />
        
        {/* Image Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Upload Image (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 cursor-pointer"
          />
          {imagePreview && (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
              >
                Remove
              </button>
            </div>
          )}
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded-lg shadow-md"
        >
          Add Note
        </button>
      </form>
    </div>
  )
}

export default Noteform