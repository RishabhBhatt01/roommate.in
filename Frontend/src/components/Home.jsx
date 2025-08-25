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

      console.log(Response.data.role);
      console.log(Response.data.name)
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