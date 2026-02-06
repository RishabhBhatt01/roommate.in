import User from '../models/User.js';
import {OAuth2Client} from 'google-auth-library' // imported a library, which was installed by me.
import {GOOGLE_WEB_CLIENT_ID , GOOGLE_WEB_CLIENT_SECRET} from '../config/envConfig.js'
import cookieToken from '../utils/token.js';

    const oauthClient = new OAuth2Client(GOOGLE_WEB_CLIENT_ID,GOOGLE_WEB_CLIENT_SECRET,
      "http://localhost:5000/api/auth/google/callback")

    if(!GOOGLE_WEB_CLIENT_ID){
      console.log("client id not found");
    }

const googleAuth = (req, res) => {
  const redirectUri = "http://localhost:5000/api/auth/google/callback";

const authUrl = oauthClient.generateAuthUrl({
  access_type: "offline",
  scope: [
    "openid",
    "email",
    "profile",
  ],
  redirect_uri: redirectUri,
});


  return res.redirect(authUrl);
};

export default googleAuth;