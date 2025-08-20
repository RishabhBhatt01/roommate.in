import axios from "axios";
import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RoomInfo = () =>{

    const [submitting,setSubmitting] =useState(false);
    const [address,setAddress] = useState("");
    const [g_address,setg_address] = useState("");
    const [roomLength,setRoomLength] = useState("");
    const [roomWidth,setRoomWidth] = useState("");
    const [numberOfRooms,setNumberOfRooms] = useState("");
    const [ownerPin,setOwnerPin] = useState("")
    const [ownerPhone,setOwnerPhone] = useState("");
    const [ownerEmail,setOwnerEmail] = useState("");
    const [Price,setPrice] = useState("");
    const navigate = useNavigate();


  const handleSubmit = async(e) =>{
    e.preventDefault();


    setSubmitting(true);
  try{
    const response = await axios.post("http://localhost:5000/api/room-info",

        {address,g_address,ownerPhone,ownerEmail,ownerPin},
        {withCredentials : true}
    )
    navigate("/room-img")

  }catch(error){
    setSubmitting(false)
    console.log("error",error);

  }
}

  return(
    <>
    <h1>Owner's Dashboard</h1>
    <form>
      <label htmlFor="dimension">Enter dimension</label>
      <input 
      id="dimension"
      type="number"
      pattern="\d{4}"
      placeholder="Enter length in ft."
      name="roomLength"
      value={roomLength}
      onChange={(e) => setRoomLength(e.target.value)}
      />
       x 
      <input 
      id="dimension"
      type="number" 
      placeholder="Enter Breadth in ft." 
      pattern="\d{4}"
      name="roomWidth"
      value={roomWidth}
      onChange={(e) => setRoomWidth(e.target.value)}

      />
      <br /><br />

      <label htmlFor="roominfo">Enter room info</label>
      <input type="number"
      placeholder="Select number of rooms"
      id="roominfo"
      name="numberOfRooms"
      value={numberOfRooms}
      min={1} // minimum number of rooms
      onChange={(e) => setNumberOfRooms(e.target.value)}
      />
      <br /><br />


      <label htmlFor="RoomPrice">Room Price after GST</label><br/>
      <input 
      type="text" 
      placeholder="Room Price(GST included)"
      id="RoomPrice"
      name="RoomPrice"
      value={Price} 
      onChange={(e) => setPrice(e.target.value)}


      /><br /><br />

      <button onSubmit={handleSubmit} disabled={submitting}> 
        {submitting ? "submitting" : "submit"}
      </button>
    </form>
    </>
  )
}

export default RoomInfo;