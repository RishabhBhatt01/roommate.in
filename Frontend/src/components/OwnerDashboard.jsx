import { useEffect , useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

const OwnerDashboard = () => {
  const [user,setUser] = useState("null");
  const [owner,setOwner] = useState("null");
  const [room,setRoom] = useState("null");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/dashboard/address",
          { withCredentials: true }
        );
        setUser(response.data.userDetails)
        setOwner(response.data.ownerDetails)
        setRoom(response.data.roomDetails)
      } catch (error) {
        alert(error.response?.data?.error || "something went wrong");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Owner Dashboard</h1> <br /> <br />

      <h2>Owner Details</h2>
      {user && (
        <p>
        username: {user.username} <br />
        phone : {user.phone} <br />
        role : {user.role}
        </p>
      )} <br /> <br />

      <h2>Personal Details</h2>
      {owner && (
        <p>
        Aadhaar : {owner.ownerAadhaar} <br />
        E-mail : {owner.ownerEmail}</p>
      )} <br /> <br />

      <h2>Your Rooms</h2>
      {room && (
        <p>
        Room Address : {room.roomAddress} <br />
        Price : {room.roomPrice} <br />
        Room Size : {room.roomSize} <br />
        landmark : {room.landMark} <br />

        </p>
      )} <br /> <br />

      <button type="button" onClick={() => navigate("/home")}>Home</button>
      
    </>
  );
};

export default OwnerDashboard;
