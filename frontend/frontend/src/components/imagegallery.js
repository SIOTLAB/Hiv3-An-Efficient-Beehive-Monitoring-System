import React, { useEffect, useState } from 'react';
import ".././styles/ImageGallery.css"

function ImageGallery() {
    const [images, setImages] = useState([]);
    useEffect(() => {
        fetch('https://hiv3-app-1abe045e0a88.herokuapp.com/images')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Data:', data); // Check what exactly is being returned
                if (Array.isArray(data)) {
                    setImages(data);
                } else {
                    throw new Error('Data is not an array');
                }
            })
            .catch(error => {
                console.error('Error fetching images:', error);
                setImages([]); // Fallback to an empty array
            });
    }, []);

    return (
        <div>
            <h1>Image Gallery</h1>
            <div className = "containerrr">
    {           images?.map((img, index) => (
                    <img key={index} src={img.data} alt={img.image_name} className ="galleryphoto" />
                ))}
            </div>
        </div>
    );
}

export default ImageGallery;
