import bcrypt from 'bcrypt'
import User from "../models/User.js";
import cookieToken from '../utils/token.js';
const loginController = async(req,res)=>{
  // received number and password.
  const {phone,password} = req.body;

  // Finding if the user exists ??
  const user = await User.findOne({"phone" : phone});

  if(!user){
    return res.status(404).json({message : "User does not exist"});
  }


  // password comparision : 
  const isMatch = await bcrypt.compare(password,user.password);

  if(!isMatch){
    return res.status(401).json({message : "Invalid Credintials"});
  }

  // if all set
  const token = cookieToken(user);
       res.cookie("token",token
      ,
      {
      httpOnly : true,
      secure : false,
      sameSite : "Lax",
      maxAge : 7*24*60*60*1000
     })

  return res.status(200).json({message : "Correct credintials, head to the homepage"})

}
export default loginController;