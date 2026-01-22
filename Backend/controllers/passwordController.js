import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import User from "../models/User.js";

const Password = async(req,res)=>{
  const {password} =  req.body;

  if(!password) {
    return res.status(400).json({error : "password is required"});
  }
  
  const userId = req.user._id;

  // hashing the password

  const saltRounds = 10; // cost factor is 10 means itni round thak hash hoga .

  const hashedPassword = await bcrypt.hash(password,saltRounds);

  // finding user
  const user  = await User.findByIdAndUpdate(
    userId,
    {password : hashedPassword},
    {new : true}
  )

  if(!user){
    return res.status(404).json({
      error : "User not found"
    })
  }

  res.status(200).json({
    message : "Password set successfully"
  })

}

export default Password;