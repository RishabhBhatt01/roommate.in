import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import VerifyOtp from "./components/VerifyOtp.jsx";
import PasswordInput from "./components/PasswordInput.jsx";
import UserRegistration from "./components/UserRegistration.jsx";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import Owner from "./components/Owner.jsx";
import RoomInfo from "./components/Roominfo.jsx";
import RoomImg from "./components/Roomimage.jsx";
import AvailableRooms from "./components/AvailableRooms.jsx";
import UserAddress from "./components/UserAddress.jsx";
import OwnerDashboard from "./components/OwnerDashboard.jsx";
import AuthGate from "./components/AuthGate.jsx";
import PrivateRoute from "./routes/privateRoutes.jsx";
import OwnerRoute from "./routes/ownerRoutes.jsx";
import ImageUpload from "./components/ImageUpload.jsx";
import UserDetails from "./components/UserDetails.jsx";

function App() {
  return (
    <BrowserRouter>
    <AuthGate>
      <Routes>
        {/* Public */}
        <Route path="/" element={<UserRegistration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<VerifyOtp />} />
        <Route path="/password" element={<PasswordInput />} />


        {/* Logged-in users */}
        <Route element={<PrivateRoute />}>
          <Route path="/user-details" element={<UserDetails />} />
          <Route path="/user-address" element={<UserAddress />} />
          <Route path="/home" element={<Home />} />
          <Route path="/available-rooms" element={<AvailableRooms />} />
          <Route path="/user-image" element={<ImageUpload />} />
          
        </Route>

        {/* Owners only */}
        <Route element={<OwnerRoute />}>
          <Route path="/owner" element={<Owner />} />
          <Route path="/room-info" element={<RoomInfo />} />
          <Route path="/room-img/:roomId" element={<RoomImg />} />
          <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </AuthGate>
    </BrowserRouter>
  );
}

export default App;

  

