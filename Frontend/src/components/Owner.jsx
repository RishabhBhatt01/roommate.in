import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Owner = () => {
  const [submitting, setSubmitting] = useState(false);
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerAadhaar, setOwnerAadhaar] = useState("");
  const navigate = useNavigate();

  const { refreshUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await axios.post(
        "http://localhost:5000/api/owner-info",
        { ownerEmail, ownerAadhaar },
        { withCredentials: true }
      );

      await refreshUser();
      navigate("/room-info");
    } catch (error) {
      alert(error.response?.data?.error || "Something went wrong");
      setSubmitting(false);
    }
  };

  return (
    <>
      <h1>Owner Information</h1>

      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={ownerEmail}
          onChange={(e) => setOwnerEmail(e.target.value)}
          required
        />

        <br /><br />

        <label>Aadhaar</label>
        <input
          type="text"
          value={ownerAadhaar}
          onChange={(e) => setOwnerAadhaar(e.target.value)}
        />

        <br /><br />

        <button disabled={submitting}>
          {submitting ? "verifying..." : "verify and proceed"}
        </button>
      </form>
    </>
  );
};

export default Owner;
