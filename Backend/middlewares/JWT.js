import jwt from "jsonwebtoken";
import {JWT_SECRET_KEY} from "../config/envConfig.js"


export const requireAuth = (req,res,next) => {
  const token = req.cookies.token;
  if(!token)
    return(
  res.status(401).json({error : "Unauthoeized"})
  )

  try{
    const decoded = jwt.verify(token,JWT_SECRET_KEY);// deode jwt
    req.user = decoded;
    next();
  }catch(err){
    return res.status(401).json({error : "Invalid token"});
  }
}