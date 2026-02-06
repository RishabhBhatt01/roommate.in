import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import {
  GOOGLE_WEB_CLIENT_ID,
  GOOGLE_WEB_CLIENT_SECRET,
} from "../config/envConfig.js";
import cookieToken from "../utils/token.js";

const oauthClient = new OAuth2Client(
  GOOGLE_WEB_CLIENT_ID,
  GOOGLE_WEB_CLIENT_SECRET,
  "http://localhost:5000/api/auth/google/callback"
);

const googleAuthCallback = async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) {
      return res.status(400).json({ message: "Authorization code missing" });
    }

    const redirectUri = "http://localhost:5000/api/auth/google/callback";

    // Exchange code for tokens
    const { tokens } = await oauthClient.getToken({
      code,
      redirect_uri: redirectUri,
    });

    oauthClient.setCredentials(tokens);
    console.log("google tokens  : ",tokens);

    // Get user info from Google
const ticket = await oauthClient.verifyIdToken({
  idToken: tokens.id_token,
  audience: GOOGLE_WEB_CLIENT_ID,
});

const payload = ticket.getPayload();

if (!payload || payload.email_verified !== true) {
  return res.status(401).json({ message: "Unauthorized" });
}

const email = payload.email;
const googleId = payload.sub;
const username = payload.name;
const profilePicture = payload.picture;

    // ---- YOUR EXISTING USER LOGIC (UNCHANGED) ----
    let user = await User.findOne({ email });

    if (user) {
      if (!user.googleId) user.googleId = googleId;
      if (user.authProvider === "phone") user.authProvider = "both";
      await user.save();
    } else {
      user = await User.create({
        email,
        googleId,
        username,
        profilePicture,
        authProvider: "google",
        isProfileComplete: false,
      });
    }

    const token = cookieToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Redirect back to frontend
    return res.redirect("http://localhost:5173/oauth-success");
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Google auth failed" });
  }
};
export default googleAuthCallback;
