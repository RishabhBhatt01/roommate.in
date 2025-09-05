import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () =>{
  const [phone,setphone] = useState("");
  const [password,setPassword] = useState("");
  const [loggingin,setLoggingin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    setLoggingin(true);

    try{
      const response = await axios.post(
        "http://localhost:5000/api/login",
        {phone,password},
        {withCredentials : true},
      )
      navigate("/home");
      setPassword("");
      setphone("");
      
    }
    catch(error){
      if(error.response){
        alert(error.response.data.message)
      }
      else{
        console.log("error , something went wrong",error);
      }
      setLoggingin(false);
    }
  }

  return(
    <form onSubmit={handleSubmit}>
      <label>Enter MOBILE phone : </label>
      <input
      type="text"
      value={phone}
      onChange={(e)=>setphone(e.target.value)}
      placeholder="Enter phone number  here"
      required
      /> <br /><br />

      <label>Enter Password : </label>
      <input 
      type="password" 
      value={password}
      onChange={(e)=> setPassword(e.target.value)}
      placeholder="Enter your password"
      required
      />
      <button type="submit" disabled={loggingin}>
        {loggingin ? "logging in" : "login"}

      </button>
    </form>
  )


}

export default Login;