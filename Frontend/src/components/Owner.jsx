import axios from "axios";
import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Owner = () =>{

    const [submitting,setSubmitting] =useState(false);
    const [address,setAddress] = useState("");
    const [g_address,setg_address] = useState("");
    const [ownerPin,setOwnerPin] = useState("")
    const [ownerEmail,setOwnerEmail] = useState("");
    const navigate = useNavigate();


  const handleSubmit = async(e) =>{
    e.preventDefault();
    setSubmitting(true);
  try{
    const response = await axios.post("http://localhost:5000/api/owner-info",

        {address,g_address,ownerEmail,ownerPin},
        {withCredentials : true}
    )
    alert("form submitted sucessfully")
    console.log(response.data);
    navigate("/room-info")

  }catch(error){
    if(error.response){
      alert(error.response.data.error || "Something went wrong");
      navigate("/home");
    }
    setSubmitting(false)
    console.log("error",error);

  }
}

  return(
    <>
    <h1>Owner's Dashboard</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="address">Enter room's address and landmark</label>

      <textarea
        name="address"
        id="address"
        rows="3"
        cols="50"
        placeholder="Enter your address"
        value={address} 
        onChange={(e) => setAddress(e.target.value)}
      />
      <br /><br />


    <label htmlFor="g_address">Paste room's Google Maps location</label>
    <textarea
      id="g_address"
      name="g_map_address"
      rows="2"
      cols="50"
      value={g_address}
      placeholder="Google map address here"
      onChange={(e) => setg_address(e.target.value)}
    />

      <br /><br />


      <label htmlFor="ownerEmail">Enter email id : </label>
      <input 
      type="email"
      placeholder="Enter mail id"
      id="ownerEmail"
      name="ownerEmail"
      value={ownerEmail}
      onChange={(e) => setOwnerEmail(e.target.value)}
      />
      <br /><br />



      <label htmlFor="ownerPin">Enter your pin code</label><br/>
      <input 
      type="text" 
      placeholder="Enter Pin code"
      id="ownerPin"
      name="ownerPin"
      value={ownerPin} 
      onChange={(e) => setOwnerPin(e.target.value)}


      /><br /><br />
      <button  disabled={submitting}> 
        {submitting ? "submitting" : "submit"}
      </button>
    </form>
    </>
  )
}

export default Owner;