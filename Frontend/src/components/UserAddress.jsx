import { useState , useEffect } from "react"
import axios from "axios";
import { useNavigate, Navigate} from "react-router-dom";
import { useAuth } from "../context/authContext";

const UserAddress = () =>{
    const { refreshUser } = useAuth();
      const navigate = useNavigate();

  
  const [city,setCity] = useState("");
  // const [landmark,setLandmark] = useState("");
  const [district,setDistrict] = useState("");
  const [state,setState] = useState("");
  const [addressMode,setAddressMode] = useState("manual");
  const [latitude,setLatitude] = useState(null);
  const [longitude,setLongitude] = useState(null);
  let payload;

          // Verification
        useEffect(() => {
  console.log("MODE:", addressMode, "LAT:", latitude, "LNG:", longitude);
}, [addressMode, latitude, longitude]);
  


  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      if(addressMode === "gps"){
        payload = {mode : "gps",latitude,longitude};
      }else{
        payload = {mode : "manual",city,district,state}
      }
      console.log(payload);
    const response = await axios.post("http://localhost:5000/api/user-address",
      {city,district,state},
      {withCredentials : true}
    )
    alert("submitted successfully")
    console.log(response.data);
    await refreshUser();
    // navigate("/home");
  }catch(error){
    if(error.response){
      alert(error.response.data.error || "Cant read from frontend")
    }
    console.log(error)
  }
  }

  const handleUseCurrrentLocation = () => {

    // Check browser support
    if(!navigator.geolocation){
      alert("Geolocation is not supported by this browser");
      return;
    }

    // Asking for current location
    navigator.geolocation.getCurrentPosition(
      (position) =>{
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // saving coordinates in state
        setLatitude(lat);
        setLongitude(lng);

        // Switching to GPS MODE
        setAddressMode("gps");




        



      },
      (error) =>{
          alert("Unable to fetch location. Please allow permission.");
          console.error(error);
      },
      {
        enableHighAccuracy : true,
        timeout : 10000,
        maximumAge : 0,
      }
    );

  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label htmlFor="city">Enter your city/village/town</label>
      <input type="text" 
      placeholder="eg. Pithoragarh"
      id="city"
      name="city"
      value={city}
      onChange={(e) => {
      if (addressMode === "gps") {
        setAddressMode("manual");
      }
      setCity(e.target.value);
}}
      // readOnly={addressMode === "gps"}
      /><br /><br />

      {/* <label htmlFor="landmark">Enter a landmark</label>
      <input
      type="text"
      placeholder="eg. near apollo hospital"
      id="landmark"
      name="landmark"
      value={landmark}
      onChange={(e) => setLandmark(e.target.value)}
      /><br /><br /> */}

      <label htmlFor="district">Enter district name</label>
      <input type="text" 
      placeholder="eg. Ghaziabad"
      id="district"
      value={district}
      onChange={(e) => {
      if (addressMode === "gps") {
        setAddressMode("manual");
      }
      setDistrict(e.target.value);
}}
      // readOnly={addressMode === "gps"}
      required
      /><br /><br />

      <label htmlFor="state">Enter State's name</label>
      <input type="text" 
      placeholder="eg. kerala"
      id="state"
      name="state"
      value={state}
      onChange={(e) => {
      if (addressMode === "gps") {
        setAddressMode("manual");
      }
      setState(e.target.value);
}}
      // readOnly={addressMode === "gps"}


      /><br /><br />


      <button type="submit">Save and Next</button>
    </form>

    <h2>Or you can try precise Location...</h2>
    <button
      type="button"
      onClick={handleUseCurrrentLocation}
      >
      Use My current Location
      </button>
    </>
  )

}
export default UserAddress;