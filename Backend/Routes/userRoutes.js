import express from 'express'; // Imported to define routes
import User from '../models/User.js'; //This user model will talk to my users collection in my roomamate database.

const router = express.Router();

// router is like a mini app, in index.js we created app, which basically runs the server
// Routers are used when we have seperate files, so index.js cannot be cluttered.

// Get request means when client wants information, i wrote the code that how server will respond if client wants to fetch client information

router.get('/users', async(req,res)=>{
  try{
    const users = await User.find();
    res.json(users);
  } catch (err){
    res.status(500).json({error : "Something went wrong"});
  }
})

// router.post('/users', async(req,res)=> {
//   try{

//     // Extracting data from the request
//     const {name,phone,role,profilePicture} = req.body;

//     console.log("getting req body", req.body);
//     console.log("new user created", req.body);


//     // Check if PHONE already exists : 
//     const existingUser = await User.findOne({phone}); // more info about findOne is in Notion

//     if(existingUser){
//       return res.status(409).json({error : 'Phone number already exists'})
//     }
//     // Creating a new user from extracted data
//     const newUser = new User({
//       name,
//       phone,
//       role,
//       profilePicture,
//     })

//     // Saving new user to MongoDB
//     await newUser.save(); // This is used to save newUser it is a function from Mongoose
//     res.status(201).json({ 
//       "message" : "User logged in sucessfully",
//       "user" : {
//         "_id" : newUser._id,
//         "name" : newUser.name,
//         "phone" : newUser.phone,
//         "role" : newUser.role,
//         "profilePicture" : newUser.profilePicture,
//       }
//     })


//   } catch (err){
//     console.log("error while saving ", err)
//     res.status(500).json({error : "Failed to create user"});
//   }
// })
// export default router;

router.post("/register-user",async(req,res)=>{
  try{
    const {username,role,phone} = req.body;

    // Existing user
    const existingUser = await User.findOne({phone});

    if(existingUser){
      return res.status(400).json({error : "Phone number exists"});
    }

    const newUser = new User({
      username,
      role,
      phone
    })
    await newUser.save();
    res.status(201).json({
      "message" : "user stored sucessfully",
      "id" : newUser._id,
      "name" : newUser.username,
      "role" : newUser.role,
      "phone" : newUser.phone
    })
  }catch(error){
    console.log("failed to create a user",error);
    res.status(500).json({
      error : "failed to create the user"
    })
    
  }


})
export default router;