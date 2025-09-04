import axios from "axios";
import { useState , useEffect } from "react";
const Home = () => {
  const [name,setName] = useState("");
  const [range,setRange] = useState("");

  useEffect(()=>{

    const fetchUser = async()=>{
    try {
        const Response = await axios.get("http://localhost:5000/api/user",{
        withCredentials : true,
      })

      setName(Response.data.name);

    } catch (error) {
      if(error.response){
        alert(error.response.data.error || "something fishy")
      }
      console.log(error);
    }
  }
    fetchUser();
    },[])


    const handleSubmit = async(e) =>{
      e.preventDefault();
      try{
        console.log("sending file atleast");
          const getNearRooms = await axios.get("http://localhost:5000/api/nearby-rooms",{
            range,
            withCredentials : true
        })
        console.log(getNearRooms.data);
        alert("fetched rooms sucessfully");
        

      }catch(error){
        if(error.response){
          alert(error.response.data.error || "frontend error");
        }
        console.log(error);

      }
    }

  return (
    <>
      <h1>Welcome , {name}</h1>

      <a href="/upload">upload profile picture</a>
      <a href="/owner" style={{marginLeft:"50%"}}>owner's tab</a> <br /><br />

      <form onSubmit={handleSubmit}>
        <label htmlFor="range">RANGE km</label>
        <input type="number" 
        placeholder="10"
        id="range"
        name="range"
        value={range}
        min={1}
        onChange={(e) => setRange(e.target.value)}
        />


        <button type="submit">Get Rooms</button>



      </form>




      
      
    </>
  );
};

export default Home;