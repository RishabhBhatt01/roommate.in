import axios from "axios";
import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Owner = () =>{

    const [submitting,setSubmitting] =useState(false);
    const [ownerEmail,setOwnerEmail] = useState("");
    const [ownerAadhaar,setOwnerAadhaar] = useState("");
    const navigate = useNavigate();


  const handleSubmit = async(e) =>{
    e.preventDefault();
    setSubmitting(true);
  try{
    const response = await axios.post("http://localhost:5000/api/owner-info",

        {ownerEmail,ownerAadhaar},
        {withCredentials : true}
    )
    alert("form submitted sucessfully")
    console.log(response.data);
    navigate("/room-info")

  }catch(error){
    if(error.response){
      alert(error.response.data.error || "Something went wrong");
    }
    setSubmitting(false)
    console.log("error",error);

  }
}

  return(
    <>
    <h1>Owner's INFORMATION</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="ownerEmail">Enter Email </label>
      <input 
      type="email"
      placeholder="Enter mail id"
      id="ownerEmail"
      name="ownerEmail"
      value={ownerEmail}
      onChange={(e) => setOwnerEmail(e.target.value)}
      required
      />
      <br /><br />

      <label htmlFor="ownerAadhaar">Enter Aadhaar </label>
      <input 
      type="text"
      placeholder="12-digit aadhar number"
      id="ownerAadhaar"
      name="ownerAadhaar"
      value={ownerAadhaar}
  
      onChange={(e) => setOwnerAadhaar(e.target.value)}
      />
      <br /><br />
      



<br /><br />
      <button  disabled={submitting}> 
        {submitting ? "verifying" : "verify and proceed"}
      </button>
    </form>
    </>
  )
}

export default Owner;