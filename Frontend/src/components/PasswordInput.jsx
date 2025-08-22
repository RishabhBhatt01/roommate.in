import axios from "axios";
import {useState} from "react";
import { useNavigate } from "react-router-dom";


const SendPassword = () => {
  const [password,setpassword] = useState("");
  const [submitting,setsubmitting] = useState(false)
  const navigate = useNavigate();


  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("password sent");
    setsubmitting(true);


    try{
      const response = await axios.post("http://localhost:5000/api/password",
        {password},
        {withCredentials : true} // allows sending/receiving cookies
      );
      alert("Password set Successfully");
      console.log("server response : ",response.data);
      setpassword("") // clear input after sending password #good practice
      navigate("/home")
    }catch(error){
      console.error("Error sending password",error);
      setsubmitting(false);
    }
  }

  return(
    <form onSubmit={handleSubmit}>
      <label>Enter password : </label>
      <input
      value = {password}
      type="password"
      onChange = {(e) => setpassword(e.target.value)}
      placeholder="Enter password here"
      required
      />

      <button type="submit" disabled={submitting}>{submitting ? "submitting..." : "submit"}</button>
    </form>
  )
}

export default SendPassword;