import axios from "axios";
import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RoomInfo = () =>{

    const [submitting,setSubmitting] =useState(false);
    const [city,setCity] = useState("");
    const [houseNumber,setHouseNumber] = useState("");
    const [pinCode,setPinCode] = useState("");
    const [roomSize,setRoomSize] = useState("");
    const [landMark,setLandMark] = useState("");
    const [roomPrice,setRoomPrice] = useState("");
    const [district,setDistrict] = useState("");
    const [state,setState] = useState("");
    const navigate = useNavigate();


  const handleSubmit = async(e) =>{
    e.preventDefault();


    setSubmitting(true);
  try{
    const response = await axios.post("http://localhost:5000/api/room-info",

        {houseNumber,city,pinCode,landMark,district,state,roomSize,roomPrice},
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

      {/* Enter flat/house/street number and name */}

      <label htmlFor="houseNumber">Enter House Number </label>
      <input 
      id="houseNumber"
      type="string"
      placeholder="like b12, 307 (seperate it using comma)"
      name="houseNumber"
      value={houseNumber}
      onChange={(e) => setHouseNumber(e.target.value)}
      required
      />
      <br /><br />

      {/*  Entering city / town */}
      <label htmlFor="city">Enter city / town / village : </label>
      <input type="text" 
      id="city"
      placeholder="Enter your city"
      name="city"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      required
      />

      <br /><br />

      {/* Entering PIN */}

      <label htmlFor="pinCode">Enter Pin Code</label>
      <input 
      id="pinCode"
      type="string"
      pattern="\d{6}"
      placeholder="Enter pin code"
      name="pinCode"
      value={pinCode}
      onChange={(e) => setPinCode(e.target.value)}
      required
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

    {/* Enter your district */}
    <label htmlFor="district">Enter Your District</label>
      <input 
      id="district"
      type="text"
      placeholder="eg. Pithoragarh"
      name="district"
      value={district}
      onChange={(e) => setDistrict(e.target.value)}
      />
      <br /><br />



    {/* Enter your State */}
    <label htmlFor="state">Enter Your State</label>
      <input 
      id="state"
      type="text"
      placeholder="eg. U.P"
      name="state"
      value={state}
      onChange={(e) => setState(e.target.value)}
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
      required
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
      required


      /><br /><br />

      <button disabled={submitting}> 
        {submitting ? "submitting" : "submit"}
      </button>
    </form>
    </>
  )
}

export default RoomInfo;