import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const VerifyOtp = () =>{
  const location = useLocation();
  const {sessionId , phone} = location.state || {}; 
  const [otp,setOtp] = useState("");
  const [isVerifying,setIsVerifying] = useState(false);
  const navigate = useNavigate();

  if(!sessionId){
    alert("No otp session found, Enter Mobile First");
    navigate("/phone")
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    setIsVerifying(true);
    console.log("Otp submitted");
    

    try {
      const response = await axios.post("http://localhost:5000/api/verify-otp",
      {
        otp,
        sessionId,
        phone
      },
      );

      // Checking if otp is verified or not
      if(response.data.verified){
        alert("bahut sahi... verified");

        
        navigate("/password");
      } else{
        alert("otp verification failed")
      }
      console.log("otp verification data",response.data);
    }catch(error){
      alert("server error. Please try again later")
      console.error("Error verification otp",error);
      setIsVerifying(false);
    }
  }


  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="">Enter 6 digit otp</label>
      <input type="text" 
      value={otp}
      pattern="\d{6}"
      onChange={(e) => setOtp(e.target.value)}
      placeholder="e.g 123456"
      required
      />
      <button type="submit" disabled={isVerifying}>
        {isVerifying ? "Verifying .." : "Verify"}      
        </button>
    </form>
  )
}

export default VerifyOtp;