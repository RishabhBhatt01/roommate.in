import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams , Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

const RoomImg = () => {
  const { roomId } = useParams();

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  const { refreshUser } = useAuth();

  // upload single image
  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("roomId", roomId);

    try {
      setUploading(true);

      await axios.post(
        "http://localhost:5000/api/upload/room",
        formData,
        { withCredentials: true }
      );

      alert("Image uploaded");
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // finalize room (called ONCE)
  const handleFinish = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/finalizeRoom",
        {},
        { withCredentials: true }
      );

      await refreshUser();
      navigate("/owner-dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to finalize room");
    }
  };

  return (
    <>
      <h1>Upload Room Images</h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Image"}
      </button>

      <br /><br />

      <button onClick={handleFinish}>
        Finish Room
      </button>
    </>
  );
};

export default RoomImg;
