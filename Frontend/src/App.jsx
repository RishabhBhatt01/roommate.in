import { useState } from 'react'
import { Navigate } from 'react-router-dom';
import ImageUpload from './components/ImageUpload.jsx';
import {BrowserRouter as Router,Routes,Route, BrowserRouter} from 'react-router-dom';
import VerifyOtp from './components/VerifyOtp.jsx';
import PasswordInput from './components/PasswordInput.jsx'
import UserRegistration from './components/UserRegistration.jsx'
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import Owner from './components/Owner.jsx';
import RoomInfo from './components/Roominfo.jsx';
import RoomImg from './components/Roomimage.jsx';
import AvailableRooms from './components/AvailableRooms.jsx';
import UserAddress from './components/UserAddress.jsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<UserRegistration/>}/>
        <Route path='/verify' element = {<VerifyOtp/>} />
        <Route path="/password" element = {<PasswordInput/>} />
        <Route path='/login' element = {<Login/>}/>


        <Route path="/home" element ={<Home/>}/>
        <Route path="/upload" element = {<ImageUpload/>} />
        <Route path="/owner"  element = {<Owner/> }/>
        <Route path='/room-info' element = {<RoomInfo/>}/>        
        <Route path='/room-img' element = {<RoomImg/>}/>
        <Route path='/available-rooms' element = {<AvailableRooms/>}/>
        <Route path='/user-address' element = {<UserAddress/>}/>



        {/* catch all other routes */}

        <Route path='*' element = {<Navigate to ="/"/>}  />
      </Routes>
    </BrowserRouter>
  )
}

export default App
