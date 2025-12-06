import React, { useContext, useState } from 'react'
import { NoteContext } from '../context/NoteContext'

function Notecard({note}) {
    const {deleteNote,updateNote}=useContext(NoteContext)
    const [isEditing,setIsEditing]=useState(false)
    const [editData,setEditData]=useState({
        title:note.title,
        content:note.content,
        image: null
    })
    const [imagePreview, setImagePreview] = useState(note.image ? `http://localhost:3000${note.image}` : null)

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditData({ ...editData, image: file });
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleRemoveImage = () => {
        setEditData({ ...editData, image: null });
        setImagePreview(null);
    }

    const handleUpdate=()=>{
        updateNote(note._id,editData)
        setIsEditing(false)
    }
  return (
     <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all p-5 flex flex-col">
      {isEditing ? (
        <>
          {/* Edit Mode */}
          <input
            type="text"
            className="border rounded-lg p-2 w-full mb-3 
                       focus:ring-2 focus:ring-blue-500 outline-none 
                       bg-white dark:bg-gray-700 
                       text-gray-900 dark:text-white"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
          />
          <textarea
            className="border rounded-lg p-2 w-full mb-3 
                       focus:ring-2 focus:ring-blue-500 outline-none 
                       bg-white dark:bg-gray-700 
                       text-gray-900 dark:text-white"
            rows="3"
            value={editData.content}
            onChange={(e) =>
              setEditData({ ...editData, content: e.target.value })
            }
          />
          
          {/* Image Upload in Edit Mode */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Change Image (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-gray-700 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 cursor-pointer"
            />
            {imagePreview && (
              <div className="relative mt-2">
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
          
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg transition"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditData({
                  title: note.title,
                  content: note.content,
                  image: null
                });
                setImagePreview(note.image ? `http://localhost:3000${note.image}` : null);
              }}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1.5 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          {/* View Mode */}
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {note.title}
          </h2>
          {note.image && (
            <div className="mt-2 mb-2">
              <img
                src={`http://localhost:3000${note.image}`}
                alt={note.title}
                className="w-full h-48 object-cover rounded-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
          <p className="text-gray-600 dark:text-gray-300 mt-2 flex-1">
            {note.content}
          </p>

          {/* Footer: date + actions */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>
              {new Date(note.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsEditing(true);
                  setEditData({
                    title: note.title,
                    content: note.content,
                    image: null
                  });
                  setImagePreview(note.image ? `http://localhost:3000${note.image}` : null);
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition"
              >
                Edit
              </button>
              <button
                onClick={() => deleteNote(note._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Notecard