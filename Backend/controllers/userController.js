import User from "../models/User.js"

export const setUser = async(req,res)=>{
  try{
    const {phone} = req.body;

    // Finding existing user : 
    const existingUser = await User.findOne({phone});

    if(existingUser){
      return res.status(400).json({error:"Phone number exists"});
    }

    const newUser = new User({
      phone
    })

    await newUser.save();
    
    res.status(201).json({
      "message" : "User stored in Database"
    })
  }catch(error){
    res.status(500).json({
      error : "Failed to create the user",
    })
  }
}