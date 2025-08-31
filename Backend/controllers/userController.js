import User from "../models/User.js"
export const getUsers = async(req,res) =>{
  try{
    const user = await User.find();
    res.json(user);
  }
  catch(err){
    res.status(500).json({error : "Something went wrong"});
  }
}
export const getUser = async (req,res) =>{
  try{
    const userId = req.user._id;

    if(!userId){
      return res.status(404).json({message : "User not found"});
    }

    const userData = await User.findById(userId);
    if(!userData){
      res.status(404).json({message : "Can't find user in DB"});
    }
    res.status(200).json({
      role : userData.role,
      name : userData.username
    })


  }catch(error){
    return res.json({error : error})

  }

}

export const setUser = async(req,res)=>{
  try{
    const {username,role,phone} = req.body;

    // Finding existing user : 
    const existingUser = await User.findOne({phone});

    if(existingUser){
      return res.status(400).json({error:"Phone number exists"});
    }

    const newUser = new User({
      username,
      role,
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