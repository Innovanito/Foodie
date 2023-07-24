import React, { useState, useRef, useEffect } from 'react';

const UploadComponent: React.FC = () => {
  // State to store the uploaded images and description
  const [images, setImages] = useState<File[]>([]);
  const [description, setDescription] = useState<string>('');

  // State to store URLs of the uploaded images to display them
  const [imageURLs, setImageURLs] = useState<string[]>([]);

  // Ref to hold the file input element
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handler for image selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // Convert FileList to an array and update the state
      const selectedFiles = Array.from(event.target.files);
      setImages((prevImages) => [...prevImages, ...selectedFiles]);

      // Create URLs for the selected images and update the state
      const selectedImageURLs = selectedFiles.map((image) => URL.createObjectURL(image));
      setImageURLs((prevURLs) => [...prevURLs, ...selectedImageURLs]);
    }
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

    const updatedURLs = [...imageURLs];
    updatedURLs.splice(index, 1);
    setImageURLs(updatedURLs);
  };

  // Handler for "Select Images" label click
  const handleLabelClick = () => {
    if (fileInputRef.current) {
      console.log('fileinputref', fileInputRef.current)
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
      images: [...images],
      desc: description
    };



    console.log('images and desc in handleSubmit', images, description)
    console.log('formData', formData);

    // Send the formData to the server (assuming you have the API endpoint defined)
    fetch('/api/upload', {
      method: 'POST',
      // body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server here (if needed)
        console.log('Upload success:', data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the upload
        console.error('Error uploading:', error);
      });
  };

  useEffect(() => {
    console.log('the value of images and desc', images, description)
  }, [images, description])
  

  return (
    <div style={{"maxWidth": "600px" }}>
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
          <textarea rows={5} cols={50} id="description" value={description} onChange={handleDescriptionChange} >
            Write a description of images
          </textarea>
        </div>
        <button type="submit">Upload</button>
      </form>

      {/* Display uploaded images */}
      <div>
        {imageURLs.map((url, index) => (
          <div key={url} style={{ position: 'relative', display: 'inline-block', margin: '10px' }}>
            <img src={url} alt="Uploaded" style={{ width: '300px', height: '300px' }} />
            <button
              onClick={() => handleDeleteImage(index)}
              style={{ position: 'absolute', top: '5px', right: '5px' }}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadComponent;
