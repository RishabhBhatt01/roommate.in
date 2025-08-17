// Import axios to make Http requests.
import axios from "axios";
import User from "../models/User";
import jwt from "jsonwebtoken"
import { JWT_SECRET_KEY } from "../config/envConfig";
export const sendOtp = async (req,res) => {
  try{


// Storing data like this is called destructure.
  const {phone} = req.body;


  // Check if mobile number exists in the request
  if(!phone){
    return res.status(400).json({error : "Mobile number required"});
  }

// Building the 2factor API URL

const apiKey = process.env.TWOFACTOR_API_KEY;
const url = `https://2factor.in/API/V1/${apiKey}/SMS/${phone}/AUTOGEN`

// Making a GET request to 2factor api
const response = await axios.get(url);

// Log and return the response from 2Factor
console.log("Otp sent Response ", response.data);

  // respond back to the frontend : 
  res.status(200).json({
    message : `OTP sent to : ${phone}`,
    sessionId : response.data.Details,
  });
} catch(error){
  console.error ("Error sending otp : ", error.message);

  //Handle different kinds of errors
  return res.status(500).json({
    error : "Failed to send OTP. Please try again."
  })

}
};

// verifying the otp
export const verifyOtp = async (req,res) => {
  try{
    
    const {sessionId, otp,phone} = req.body;

    // validate input
    if(!sessionId || !otp){
      return res.status(400).json({error : "Session id and otp are required"})
    }

    // 2 factor api to verify otp
    const apiKey = process.env.TWOFACTOR_API_KEY;
    const url = `https://2factor.in/API/V1/${apiKey}/SMS/VERIFY/${sessionId}/${otp}`;

    // Send get request to 2 Factor
    const verifyResponse = await axios.get(url);

    console.log(verifyResponse.data);

    // checking if otp matched
    if (verifyResponse.data.Details === "OTP Matched"){
      const user = await User.findOne({phone});

      const token = jwt.sign(
        {
          id : user._id,
          role:user.role
        },
        JWT_SECRET_KEY,
        {expiresIn : "7d"}
      );
      
     res.cookie("token",token,{
      httpOnly : true,
      secure : false,
      sameSite : "Strict",
      maxAge : 7*24*60*60*1000
     })



      return res.status(200).json({
        message : "Otp verified",
        verified : true,
      })
    }else{
      return res.status(400).json({
        message : "OTP verification failed",
        verified : false,
      })
    }
  }
  catch(error)
{
console.error("otp verification error",error.message);
return res.status(500).json({error: "failed to verify otp"})
}
}