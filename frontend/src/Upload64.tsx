import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const UploadComponent: React.FC = () => {
  // State to store the uploaded images and description
  const [images, setImages] = useState<File[]>([]);
  const [description, setDescription] = useState<string>('');

  // State to store base64 encoded images to display them
  const [base64Images, setBase64Images] = useState<string[]>([]);

  // Ref to hold the file input element
  const fileInputRef = useRef<HTMLInputElement | null>(null);


  // Handler for image selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // Convert FileList to an array and update the state
      const selectedFiles = Array.from(event.target.files);
      setImages((prevImages) => [...prevImages, ...selectedFiles]);

      // Create base64 strings for the selected images and update the state
      const promises = selectedFiles.map((image) => getBase64(image));
      Promise.all(promises).then((base64Strings) =>
        setBase64Images((prevBase64) => [...prevBase64, ...base64Strings])
      );
    }
  };

  // Convert image to base64 string
  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handler for description input
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  // Handler for deleting an image
  const handleDeleteImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);

    const updatedBase64Images = [...base64Images];
    updatedBase64Images.splice(index, 1);
    setBase64Images(updatedBase64Images);
  };

  // Handler for "Select Images" label click
  const handleLabelClick = () => {
    if (fileInputRef.current) {
      console.log('fileinputref', fileInputRef.current);
      fileInputRef.current.click();
    }
  };

  // Handler for "Upload more" label click
  const handleUploadMoreLabelClick = () => {
    if (fileInputRef.current) {
      // Clear the input value to allow selecting the same images again
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  // Handler for form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submit button pushed');

    const formData = {
      images: [...base64Images],
      desc: description,
    };

    console.log('formData', formData)

    axios
      .post('http://127.0.0.1:8000/upload64', formData)
      .then((response) => {
        // Handle the response from the server here (if needed)
        console.log('Upload success:', response.data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the upload
        console.error('Error uploading:', error);
      });
  };


  return (
    <div style={{ maxWidth: '600px' }}>
      <h2>Upload Component</h2>
      <form onSubmit={handleSubmit}>
        <div>
          {/* Hidden file input */}
          <input
            type="file"
            ref={(ref) => (fileInputRef.current = ref)}
            multiple
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <label htmlFor="image" onClick={images.length > 0 ? handleUploadMoreLabelClick : handleLabelClick}>
            {images.length > 0 ? 'Upload more' : 'Select Images'}
          </label>
          {/* Visible input to show selected file names */}
          <input
            type="text"
            readOnly
            value={images.map((image) => image.name).join(', ')}
            style={{ margin: '5px 0', display: 'block' }}
          />
        </div>
        <div>
          <textarea rows={5} cols={50} id="description" value={description} onChange={handleDescriptionChange}>
            Write a description of images
          </textarea>
        </div>
        <button type="submit">Upload</button>
      </form>

      {/* Display uploaded images */}
      <div>
        {base64Images.map((base64String, index) => (
          <div key={index} style={{ position: 'relative', display: 'inline-block', margin: '10px' }}>
            <img src={base64String} alt="Uploaded" style={{ width: '300px', height: '300px' }} />
            <button onClick={() => handleDeleteImage(index)} style={{ position: 'absolute', top: '5px', right: '5px' }}>
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadComponent;
