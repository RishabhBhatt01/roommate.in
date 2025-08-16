// src/components/PhoneInput.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PhoneInput = () => {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/send-otp", 
        {mobile : phone},
      );



      console.log("OTP sent response:", response.data);
      const sessionId = response.data.sessionId;
      navigate("/verify",{state : {sessionId}})
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter Phone Number:</label><br />
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="e.g. 9876543210"
        required
      />
      <button type="submit">Send OTP</button>
    </form>
  );
};

export default PhoneInput;