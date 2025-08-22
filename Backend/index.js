import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose';
import userRoute from './Routes/userRoutes.js';
import cors from "cors";
import otpRouter from "./Routes/otpRoutes.js";
import imageRoutes from "./Routes/imageRoutes.js";
import passwordRoutes from "./Routes/passwordRoutes.js"
import cookieParser from 'cookie-parser';
import loginRoutes from './Routes/loginRoutes.js'
import ownerRoutes from './Routes/ownerRoutes.js'

// dotenv.config is used to load environment variables
dotenv.config();

// create express app
const app = express();

// Get values from .env

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware to parse JSON
app.use(cors({
  origin: "http://localhost:5173", // frontend origin
  credentials: true,               // allow cookies
}));
app.use(express.json());
app.use(cookieParser());

// APIs
app.use('/api',userRoute);
app.use("/api",otpRouter);
app.use('/api',imageRoutes);
app.use('/api',passwordRoutes);
app.use('/api',loginRoutes);
app.use('/api',ownerRoutes);

// Test route
app.get('/',(req,res) => {
  res.send("Roommate.in is live");
})

// Connect to Mongodb and start server

mongoose.connect(MONGO_URI)
.then(()=> {
  console.log("🔗 Mongo DataBase Connected ✅");
  app.listen(PORT,()=>{
    console.log(`✅Server is running on localhost ${PORT}`)
  });
})
.catch((err)=>{
  console.log("❌ Connection error",err);
})
