import React,{useState} from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const RoomImg = ()=> {

  const [file, setFile] = useState(null);
  const navigate = useNavigate();


  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Save the selected file to state
  };


  const handleSubmit = async () => {
    if (!file) {
      alert("Please select an image before uploading.");
      return;
    }

    // 5. Prepare the form data (important for file uploads)
    const formData = new FormData();
    formData.append("file", file); // "file" is the key that backend will use

    try {
      // 6. Send a POST request to backend (make sure this path matches your backend route)
      const response = await axios.post("http://localhost:5000/api/upload/room", formData, {
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

  return(
    <>
    <h1>upload images</h1>
    <label htmlFor="room1">Upload Room1 image</label>
    <input 
    type="file" 
    id="room1"
    accept="image/*" onChange={handleFileChange}
    required
    />

    <button type="button" onClick={handleSubmit}>UPLOAD</button>
    <br /><br />


    <label htmlFor="room2">Upload Room2 image(optional)</label>
    <input 
    type="file" 
    id="room2"
    accept="image/*" onChange={handleFileChange}
    />
    <button type="button" onClick={handleSubmit}>UPLOAD</button>
    <br /><br />

    <label htmlFor="room3">Upload Room3 image(optional)</label>
    <input 
    type="file" 
    id="room3"
    accept="image/*" onChange={handleFileChange}
    />
    <button type="button" onClick={handleSubmit}>UPLOAD</button>
    <br /><br />

    <label htmlFor="toilet">upload toilet image</label>
    <input 
    type="file" 
    id="toilet"
    accept="image/*" onChange={handleFileChange}
    required
    />
    <button type="button" onClick={handleSubmit}>UPLOAD</button>
    <br /><br />

    <label htmlFor="bathroom">upload bathroom image(if not attached)</label>
    <input 
    type="file" 
    id="bathroom"
    accept="image/*" onChange={handleFileChange}
    />
    <button type="button" onClick={handleSubmit}>UPLOAD</button>
    <br /><br />

    <label htmlFor="balcony">upload balcony image(if any)</label>
    <input 
    type="file" 
    id="balcony"
    accept="image/*" onChange={handleFileChange}
    />
    <button type="button" onClick={handleSubmit}>UPLOAD</button>
    <br /><br />

<button type="button" onClick={() => navigate('/owner-dashboard')}>
  next
</button>

    
    </>
  )
}
export default RoomImg;