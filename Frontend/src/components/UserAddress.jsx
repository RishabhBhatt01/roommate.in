import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserAddress = () =>{
  const [building,setBuilding] = useState("");
  const [city,setCity] = useState("");
  const [landmark,setLandmark] = useState("");
  const [district,setDistrict] = useState("");
  const [state,setState] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) =>{
    console.log("form submitting");
    e.preventDefault();
    try{
    const response = await axios.post("http://localhost:5000/api/user-address",
      {building,city,landmark,district,state},
      {withCredentials : true}
    )
    alert("submitted successfully")
    console.log(response.data);
    navigate("/home");
  }catch(error){
    if(error.response){
      alert(error.response.data.error || "Cant read from frontend")
    }
    console.log(error)
  }
  }

  return (
    <form onSubmit={handleSubmit}>

      <label htmlFor="building">Enter Your Building/House/flatnumber</label>
      <input type="text" 
      placeholder="Building and flatnumber"
      id="building"
      name="building"
      value={building}
      onChange={(e) => setBuilding(e.target.value)}
      required      
      /> <br /><br />
      <label htmlFor="city">Enter your city/village/town</label>
      <input type="text" 
      placeholder="eg. Pithoragarh"
      id="city"
      name="city"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      /><br /><br />

      <label htmlFor="landmark">Enter a landmark</label>
      <input
      type="text"
      placeholder="eg. near apollo hospital"
      id="landmark"
      name="landmark"
      value={landmark}
      onChange={(e) => setLandmark(e.target.value)}
      /><br /><br />

      <label htmlFor="district">Enter district name</label>
      <input type="text" 
      placeholder="eg. Ghaziabad"
      id="district"
      value={district}
      onChange={(e) => setDistrict(e.target.value)}
      required
      /><br /><br />

      <label htmlFor="state">Enter State's name</label>
      <input type="text" 
      placeholder="eg. kerala"
      id="state"
      name="state"
      value={state}
      onChange={(e) => setState(e.target.value)}

      /><br /><br />


      <button type="submit">Submit</button>
    </form>
  )

}
export default UserAddress;