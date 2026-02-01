import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const UserDetails = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/user-details",
        { username, role },
        { withCredentials: true }
      );
      alert("Submitted Successfully");
      navigate("/user-address");
    } catch (error) {
      alert(error.response?.data?.error || "Submission failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter your name</label>
      <br />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="eg. Rishabh"
        required
        className="border-b-2 rounded ml-5" // Changed to className
      />
      <br /><br />

      <label>Enter your role</label>
      <br />
      <input
        type="radio"
        id="role1"
        name="role"
        value="tenant"
        checked={role === "tenant"}
        onChange={(e) => setRole(e.target.value)}
        required
      />
      <label htmlFor="role1">Tenant</label>

      <input
        type="radio"
        id="role2"
        name="role"
        value="owner"
        checked={role === "owner"}
        onChange={(e) => setRole(e.target.value)}
      />
      <label htmlFor="role2">Owner</label>
      <br /><br />

      <button type="submit">Submit</button>
    </form>
  );
};

export default UserDetails;