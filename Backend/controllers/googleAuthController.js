import {OAuth2Client} from google-auth-library
import GOOGLE_WEB_CLIENT_ID from '../config/envConfig'

    const oauthClient = new OAuth2Client(GOOGLE_WEB_CLIENT_ID)
    if(!GOOGLE_WEB_CLIENT_ID){
      console.log("client id not found");
    }
const googleAuth = async(req,res)=>{
  try{
     const idToken = req.body.idToken;
     if(!idToken){
      return res.status(400).json({Message : "idToken is required"})
     }

     const loginTicket = await oauthClient.verifyIdToken({idToken,audience : GOOGLE_WEB_CLIENT_ID});

     const payload = loginTicket.getPayload();
     if(payload == null || payload.email_verified !== true ){
      return res.status(401).json({error : "Unauthorized"})
     }
     console.log(payload.name);
     console.log(payload.email);


     res.status(200).json({messsage : "Successful"});




  }
  catch(error){
    console.log(error);
    return res.status(401).json({message : "Unauthorized"})

  }
  

}
export default googleAuth;