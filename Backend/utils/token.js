import jwt from "jsonwebtoken";            // to create the token
import { JWT_SECRET_KEY } from "../config/envConfig.js";  //  secret key
const cookieToken = (user) =>{
  const token = jwt.sign(
        {
          id : user._id,
          role:user.role
        },
        JWT_SECRET_KEY,
        {expiresIn : "7d"}
      );

      return token;

}
export default cookieToken;