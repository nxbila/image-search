import { useState, useEffect } from "react";
import ImageModal from "./ImageModal";

const ImageCard = ({image}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCloseModal = () => {
        setIsModalOpen(false);
    }
    // useEffect(() => {
    //     const preload = new Image();
    //     preload.src = image.src.large;
    // },[image.src.large])

    const handleViewOriginal = () => {
        window.open(image.url, "_blank");
        setIsModalOpen(false);
    }
  return (
    <>
    <div onClick={() => setIsModalOpen(true)} className="bg-white rounded-lg shadow-md overflow-hidden 
    cursor-pointer transition-transform hover:scale-105">
        <img src = {image.src.medium}
        alt = {image.alt || "Pexels image"}
        loading="lazy"
        className='w-full h-48 object-cover'/>
    </div>
    <ImageModal 
    image = {image}
    isOpen = {isModalOpen}
    onViewOriginal = {handleViewOriginal}
    onClose = {handleCloseModal}
     />
    </>
  )
}

export default ImageCard