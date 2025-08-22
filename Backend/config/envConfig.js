import dotenv from "dotenv"
dotenv.config();

export const PORT = process.env.PORT
export const MONGO_URI=process.env.MONGO_URI

//  API KEY FOR OTP : WEBSITE NAME 2 FACTOR
export const TWOFACTOR_API_KEY=process.env.TWOFACTOR_API_KEY

// #JWT SECRET KEYS
export const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY