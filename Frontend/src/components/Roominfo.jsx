import axios from "axios";
import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RoomInfo = () =>{

    const [submitting,setSubmitting] =useState(false);
    const [roomAddress,setRoomAddress] = useState("");
    const [houseNumber,setHouseNumber] = useState("");
    const [pinCode,setPinCode] = useState("");
    const [roomSize,setRoomSize] = useState("");
    const [landMark,setLandMark] = useState("");
    const [roomPrice,setRoomPrice] = useState("");
    const navigate = useNavigate();


  const handleSubmit = async(e) =>{
    e.preventDefault();


    setSubmitting(true);
  try{
    const response = await axios.post("http://localhost:5000/api/room-info",

        {roomAddress,houseNumber,pinCode,landMark,roomSize,roomPrice},
        {withCredentials : true}
    )
    console.log(response.data);
    alert("sucessfully submitted");
    navigate("/room-img")

  }catch(error){
    setSubmitting(false)
    console.log("error",error);
    if(error.response){
      alert(error.response.message ||error.response.error || "frontend can't see you")
    }

  }
}

  return(
    <>
    <h1>Room's Information</h1>
    <form onSubmit={handleSubmit}>

{/*  Entering address */}
      <label htmlFor="">Enter room's address : </label>
      <input type="text" 
      id="address"
      placeholder="Enter room address"
      name="roomAddress"
      value={roomAddress}
      onChange={(e) => setRoomAddress(e.target.value)}
      required
      />

      <br /><br />

      {/* Enter flat/house/street number and name */}

      <label htmlFor="houseNumber">Enter House Number </label>
      <input 
      id="houseNumber"
      type="number"
      placeholder="like b12, 307 (seperate it using comma)"
      name="houseNumber"
      value={houseNumber}
      onChange={(e) => setHouseNumber(e.target.value)}
      />
      <br /><br />

      {/* Entering PIN */}

      <label htmlFor="pinCode">Enter Pin Code</label>
      <input 
      id="pinCode"
      type="number"
      pattern="\d{6}"
      placeholder="Enter pin code"
      name="pinCode"
      value={pinCode}
      onChange={(e) => setPinCode(e.target.value)}
      />
      <br /><br />

      <label htmlFor="landmark">Enter landmark</label>
      <input 
      id="landmark"
      type="text"
      placeholder="eg. near post office"
      name="landMark"
      value={landMark}
      onChange={(e) => setLandMark(e.target.value)}
      />
      <br /><br />

  {/* Enter room Size */}
      <label htmlFor="roomSize">Enter Room size</label>
      <input 
      id="roomSize"
      type="number"
      pattern="\d{4}"
      placeholder="like 1 for 1 bhk"
      name="roomSize"
      value={roomSize}
      onChange={(e) => setRoomSize(e.target.value)}
      />
      <br /><br />


      <label htmlFor="RoomPrice">Room Price after GST</label><br/>
      <input 
      type="text" 
      placeholder="Room Price(GST included)"
      id="RoomPrice"
      name="roomPrice"
      value={roomPrice} 
      onChange={(e) => setRoomPrice(e.target.value)}


      /><br /><br />

      <button disabled={submitting}> 
        {submitting ? "submitting" : "submit"}
      </button>
    </form>
    </>
  )
}

export default RoomInfo;