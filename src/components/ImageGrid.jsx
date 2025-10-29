import React from 'react'
import ImageCard from './ImageCard'

const ImageGrid = ({ images, loading }) => {
    if (loading && images.length == 0) {
        return <div className='flex justify-center items-center h-64'>
            <div className='loading-spinner'></div>
        </div>
    }
    if (images.length === 0 && !loading) {
        return <p>No images found. Try a different search term</p>
    }
    return (
        <>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
    lg:grid-cols-4 gap-6 mt-2'>
                {images.map((image) => (
                    <ImageCard key={image.id} image={image} />
                ))}
            </div>
            {loading && (
                <div className='flex justify-center items-center h-64'>
                    <div className='loading-spinner'></div>
                </div>
            )}
        </>
    )
}

export default ImageGrid