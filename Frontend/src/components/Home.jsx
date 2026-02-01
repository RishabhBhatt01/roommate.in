import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Home = () => {
  const [range, setRange] = useState("");
  const [rooms, setRooms] = useState([]);
  const { user, loading } = useAuth();

  if (loading || !user) return null;

  const fetchRooms = async (rangeValue) => {
    const res = await axios.get(
      "http://localhost:5000/api/nearby-rooms",
      {
        params: rangeValue ? { range: rangeValue } : {},
        withCredentials: true,
      }
    );
    setRooms(res.data.rooms);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <>
      <h1>Welcome</h1>

      <Link to="/user-image">upload profile picture</Link>

      {/* Owner entry ONLY */}
      <Link to="/owner" style={{ marginLeft: "50%" }}>
        owner's tab
      </Link>

      <br /><br />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchRooms(range);
        }}
      >
        <label>RANGE km</label>
        <input
          type="number"
          value={range}
          min={1}
          onChange={(e) => setRange(e.target.value)}
        />
        <button type="submit">Get Rooms</button>
      </form>

      <hr />

      {rooms.map((room) => (
        <div key={room._id}>
          <p>{room.roomAddress}</p>
          <p>{room.roomPrice}</p>
        </div>
      ))}
    </>
  );
};

export default Home;
