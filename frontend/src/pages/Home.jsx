import React, { useContext, useEffect, useState } from 'react'
import { NoteContext } from '../context/NoteContext'
import Notecard from '../components/Notecard'
import { Search } from 'lucide-react'

function Home() {
  const {notes,loading,getNotes}=useContext(NoteContext)
  const [searchQuery, setSearchQuery] = useState('')
  
  // Refetch notes when navigating to Home to ensure fresh data
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getNotes();
    }
  }, []) // Only run once when component mounts
  
  console.log(notes)

  if(loading){
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <p className='text-lg text-gray-600'>Loading...</p>
      </div>
    )
  }
  
  // Ensure notes is always an array
  const notesArray = Array.isArray(notes) ? notes : []
  
  // Filter notes based on search query (case-insensitive)
  const filteredNotes = notesArray.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
 if(notesArray.length===0){
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <p className='text-lg text-gray-700'>No notes available.</p>
    </div>
  )
 }
 
 return(
  <div className='min-h-screen p-4'>
    {/* Search Bar */}
    <div className='flex justify-end mb-6'>
      <div className='max-w-md w-full'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
          <input
            type='text'
            placeholder='Search notes by title...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400'
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition'
            >
              ✕
            </button>
          )}
        </div>
        {searchQuery && (
          <p className='mt-2 text-sm text-gray-400 text-right'>
            {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'} found
          </p>
        )}
      </div>
    </div>

    {/* Notes Grid */}
    {filteredNotes.length === 0 && searchQuery ? (
      <div className='flex justify-center items-center min-h-[50vh]'>
        <div className='text-center'>
          <p className='text-lg text-gray-400 mb-2'>No notes found</p>
          <p className='text-sm text-gray-500'>Try a different search term</p>
        </div>
      </div>
    ) : (
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {filteredNotes.map((note)=>(
          <Notecard key={note._id} note={note}/>
        ))}
      </div>
    )}
  </div>
 )
}

export default Home