// 1. Import necessary hooks and axios
import React, { useState } from 'react';
import axios from 'axios'; // used to send HTTP requests


const ImageUpload = () => {
  // 2. Local state to store the selected file
  const [file, setFile] = useState(null);

  // 3. This function runs when the user selects a file
  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Save the selected file to state
  };

  // 4. This function runs when the user clicks the UPLOAD button
  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image before uploading.");
      return;
    }

    // 5. Prepare the form data (important for file uploads)
    const formData = new FormData();
    formData.append("file", file); // "file" is the key that backend will use

    try {
      // 6. Send a POST request to backend (make sure this path matches your backend route)
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
        withCredentials : true
      });

      // 7. Handle success
      alert("Image uploaded successfully!");
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Image upload failed.");
    }
  };
 
  // 9. UI
  return (
    <div>
      {/* Heading */}
      <h2>Upload Image</h2>

      {/* File input */}
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {/* Upload button */}
      <button type="button" onClick={handleUpload}>UPLOAD</button>
    </div>
  );
};

// 10. Export the component for use in App.jsx
export default ImageUpload;

