import { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar'
import ImageGrid from './components/ImageGrid';


function App() {
const [images, setImages] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [query, setQuery] = useState("nature");
const [page, setPage] = useState(1);

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const PEXELS_API_URL = "https://api.pexels.com/v1/search"

const fetchImage = async (searchQuery = "nature", pageNum = 1) => {
  if(!PEXELS_API_URL){
    setError("API key is missing. Please set your Pexels API key");
  }
  setLoading(true);
  setError(null);
  try{
    const response = await fetch(
     `${PEXELS_API_URL}?query=${encodeURIComponent(searchQuery)}&per_page=20&page=${pageNum}`,
     {
      headers:
      {
        Authorization: PEXELS_API_KEY,
      },
     }
    );
    console.log("Fetch response:", response);
    if(!response.ok){
      throw new Error(`Error: ${response.status} ${response.statusText}`)
    }
    const data = await response.json();
    console.log("fetched data",data);

    if(pageNum == 1){
      setImages(data.photos || []);
      setPage(1);
    }
    else{
      setImages((prevImages) => [...prevImages, ...(data.photos || [])])
      setPage(pageNum)
    }
  }
  catch(error){
    console.log("Fetch error", error);
    setError(error.message || "An error occurred in images");
  }
  finally{
    setLoading(false);
  }
}
useEffect(() => {
  fetchImage(query);
},[]);

const handleSearch = (searchTerm) => {
  setQuery(searchTerm);
  fetchImage(searchTerm, 1);
}
const handleLoadMore = () => {
  fetchImage(query, page+1);
}
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className='container mx-auto p-4'>
          <h1 className='text-4xl font-bold text-center text-gray-800 mb-2'>Image Search</h1>
          <p className='text-center text-gray-600 mb-8'>Powered by Pexels</p>
          <SearchBar onSearch = {handleSearch} />
          {error && (
            <div>
              <p className='text-red-400 text-center mb-4'>{error}</p>
            </div>
          )}
          <ImageGrid images = {images} loading = {loading} />
          {images.length > 0 && !loading && (
            <div className='text-center'>
              <button onClick = {handleLoadMore} className='bg-blue-500 px-4 py-3 mt-4 rounded-lg text-white
               hover:bg-blue-600 transition'>Load More Pages</button>
              </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
