import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const UserRegistration = () =>{
  const [username,setusername] = useState("");
  const [role,setRole] = useState("");
  const [phone,setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();

    try{

      const userResponse = await axios.post("http://localhost:5000/api/register-user",
        {
      username,
      role,
      phone,
        }
      );
      console.log(userResponse.data);
      
      const otpResponse = await axios.post("http://localhost:5000/api/send-otp",
        {phone}
      )
      console.log("OTP sent response:", otpResponse.data);
      const sessionId = otpResponse.data.sessionId;

      console.log("session id received",sessionId);
      navigate("/verify",{state : {sessionId,phone}})


    } catch(error) {
  if (error.response) {
    alert(error.response.data.error || "Something went wrong");
    console.log(error.response.data);
  } else {
    alert("Server not reachable");
  }
  console.log("user registration error ", error);
}
  }

  return (
    <form onSubmit = {handleSubmit}>
      <label>Enter your name </label>
      <input
      type="text"
      value={username}
      onChange={(e) => setusername(e.target.value)}
      placeholder = "eg. Rishabh Bhatt"
      required
      />

      <label>Enter your role</label><br/>
      <input
      type="radio"
      id="role1"
      checked = {role === "tenant"}
      onChange={e=> setRole(e.target.value)}
      name="role"
      value={"tenant"}
      />
      <label htmlFor="role1">Tenant</label>

      <input
      type="radio"
      id="role2"
      checked = {role === "owner"}
      onChange={e => setRole(e.target.value)}
      name="role"
      value={"owner"}
      />
      <label htmlFor="role2">Owner</label>

      <br /> <br />

      {/* Entering Mobile number */}

      <label >Enter mobile Number</label>
      <input type="tel"
      required
      placeholder="eg. 1234567890"
      onChange={(e)=> setPhone(e.target.value)}
      value={phone}
      />
      <br /><br />
      <button type="submit">Register & Send OTP</button>

      <Link to="/login">Already have an account? Log in</Link>


    </form>
  )
}
export default UserRegistration;