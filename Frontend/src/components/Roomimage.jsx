import React,{useState} from "react";
import axios from 'axios'

const RoomImg = ()=> {

  const [files, setFiles] = useState({
  room1: null,
  room2: null,
  room3: null,
  toilet: null,
  bathroom: null,
  balcony: null
});


const handleFileChange = (e) => {
  setFiles(prev => ({
    ...prev,
    [e.target.id]: e.target.files[0]
  }));
};



  const handleSubmit=async()=>{
    if(!files.room1 || !files.toilet) {
  alert("Required images missing");
  return;
}

    const formData = new FormData();
    Object.entries(files).forEach(([key, file]) => {
    if (file) formData.append(key, file);
});

    try{
      // send a post request to backend
      
      const response = await axios.post("http://localhost:5000/api/upload", formData,{
        withCredentials : true
      });

      alert("Image uploaded successfully");
      console.log("Server response : ",response.data);

    }catch(error){
      console.error("Upload failed : ",error);
      alert("Image upload failed");

    }
    
  }
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
    <br /><br />


    <label htmlFor="room2">Upload Room2 image(optional)</label>
    <input 
    type="file" 
    id="room2"
    accept="image/*" onChange={handleFileChange}
    />
    <br /><br />

    <label htmlFor="room3">Upload Room3 image(optional)</label>
    <input 
    type="file" 
    id="room3"
    accept="image/*" onChange={handleFileChange}
    />
    <br /><br />

    <label htmlFor="toilet">upload toilet image</label>
    <input 
    type="file" 
    id="toilet"
    accept="image/*" onChange={handleFileChange}
    required
    />
    <br /><br />

    <label htmlFor="bathroom">upload bathroom image(if not attached)</label>
    <input 
    type="file" 
    id="bathroom"
    accept="image/*" onChange={handleFileChange}
    />
    <br /><br />

    <label htmlFor="balcony">upload balcony image(if any)</label>
    <input 
    type="file" 
    id="balcony"
    accept="image/*" onChange={handleFileChange}
    />
    <br /><br />

    <button type="button" onClick={handleSubmit}>UPLOAD</button>
    </>
  )
}
export default RoomImg;