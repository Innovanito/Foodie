import { useState, useEffect } from 'react';
import axios from 'axios';

const ShowImg = () => {
  const [imageSrc, setImageSrc] = useState<string>('');

  const image_id = "64c222d9798a967c841916e7";
  useEffect(() => {
    // Make a GET request to your backend API endpoint to fetch the image data
    axios.get<Blob>(`http://localhost:8000/api/get_image_by_id/${image_id}`, { responseType: 'blob' })
      .then(response => {
        // Once the data is fetched, create a blob URL for the image data
        const blob = new Blob([response.data], { type: 'image/jpeg' });
        setImageSrc(URL.createObjectURL(blob));
      })
      .catch(error => {
        console.error('Error fetching image:', error);
      });
  }, [image_id]); // Add image_id as a dependency to the useEffect hook

  return (
    <div>
      <h1>Display Image</h1>
      {/* Display the image in an <img> tag with max width and max height set to 400 pixels */}
      {imageSrc && <img src={imageSrc} alt="Image from MongoDB" style={{ maxWidth: '400px', maxHeight: '400px' }} />}
    </div>
  );
};

export default ShowImg;
