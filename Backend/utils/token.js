import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/envConfig.js";


const cookieToken = (user) => {
  // Create JWT payload with user information
  const payload = {
    _id: user._id,
    role: user.role
  };

  // Sign the token with secret key and set expiration
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "7d", issuer: "roommate.in"});
  return token;
};

export default cookieToken;