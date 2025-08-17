import { useState } from 'react'
import PhoneInput from './components/PhoneInput.jsx';
import ImageUpload from './components/ImageUpload.jsx';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import VerifyOtp from './components/VerifyOtp.jsx';
import PasswordInput from './components/PasswordInput.jsx'
import UserRegistration from './components/UserRegistration.jsx'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element = {<UserRegistration/>}/>
        <Route path="/upload" element = {<ImageUpload/>} />
        <Route path='/phone' element = {<PhoneInput/>} />
        <Route path='/verify' element = {<VerifyOtp/>} />
        <Route path="/password" element = {<PasswordInput/>} />
      </Routes>
    </Router>
  )
}

export default App
