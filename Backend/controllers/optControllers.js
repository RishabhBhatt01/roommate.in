// Import axios to make Http requests.
import axios from "axios";
export const sendOtp = async (req,res) => {
  try{


// Storing data like this is called destructure.
  const {mobile} = req.body;


  // Check if mobile number exists in the request
  if(!mobile){
    return res.status(400).json({error : "Mobile number required"});
  }

// Building the 2factor API URL

const apiKey = process.env.TWOFACTOR_API_KEY;
const url = `https://2factor.in/API/V1/${apiKey}/SMS/${mobile}/AUTOGEN`

// Making a GET request to 2factor api
const response = await axios.get(url);

// Log and return the response from 2Factor
console.log("Otp sent Response ", response.data);

  // respond back to the frontend : 
  res.status(200).json({
    message : `OTP sent to : ${mobile}`,
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