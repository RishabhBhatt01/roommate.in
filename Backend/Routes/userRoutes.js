// import express from 'express'; // Imported to define routes
// import User from '../models/User.js'; //This user model will talk to my users collection in my roomamate database.

// const router = express.Router();

// // router is like a mini app, in index.js we created app, which basically runs the server
// // Routers are used when we have seperate files, so index.js cannot be cluttered.

// // Get request means when client wants information, i wrote the code that how server will respond if client wants to fetch client information

// router.get('/users', async(req,res)=>{
//   try{
//     const users = await User.find();
//     res.json(users);
//   } catch (err){
//     res.status(500).json({error : "Something went wrong"});
//   }
// })

// router.post("/register-user",async(req,res)=>{
//   try{
//     const {username,role,phone} = req.body;

//     // Existing user
//     const existingUser = await User.findOne({phone});

//     if(existingUser){
//       return res.status(400).json({error : "Phone number exists"});
//     }

//     const newUser = new User({
//       username,
//       role,
//       phone
//     })
//     await newUser.save();
//     res.status(201).json({
//       "message" : "user stored sucessfully",
//       "id" : newUser._id,
//       "name" : newUser.username,
//       "role" : newUser.role,
//       "phone" : newUser.phone
//     })
//   }catch(error){
//     console.log("failed to create a user",error);
//     res.status(500).json({
//       error : "failed to create the user"
//     })
    
//   }


// })
// export default router;

import { getUser ,setUser } from "../controllers/userController";
import express from "express"

const router = express.Router();

router.get("/users",getUser);
router.post("/register-user",setUser);