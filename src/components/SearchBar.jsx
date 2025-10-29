import React, { useState } from 'react'

const SearchBar = ({onSearch}) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(searchTerm.trim()){
            onSearch(searchTerm.trim());
        }
    }   
    
  return (
    <form onSubmit={handleSubmit}>
        <div className='flex justify-center'>
        <div className='flex items-center gap-x-4 max-w-md w-full'>
            <input
            type='text'
            placeholder = "Search for images"
            value = {searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border-gray-400 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-500
            shadow-sm" />
            <button type = "submit" className='bg-blue-500 px-4 py-3 text-white rounded-lg 
            hover:bg-blue-600 transition'>Search</button>
        </div>
        </div>
    </form>
  )
}

export default SearchBar