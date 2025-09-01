import axios from "axios";
import { useState , useEffect } from "react";
const Home = () => {
  const [name,setName] = useState("");

  useEffect(()=>{

    const fetchUser = async()=>{
    try {
        const Response = await axios.get("http://localhost:5000/api/user",{
        withCredentials : true,
      })

      setName(Response.data.name + " role " + Response.data.role);

    } catch (error) {
      if(error.response){
        alert(error.response.data.error || "something fishy")
      }
      console.log(error);
    }
  }
    fetchUser();
    },[])

  return (
    <>
      <h1>Welcome , {name}</h1>

      <a href="/upload">upload profile picture</a>
      <br /><br />
      <a href="/owner">owner's tab</a>
      
    </>
  );
};

export default Home;