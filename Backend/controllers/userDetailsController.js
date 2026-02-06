import User from "../models/User.js";
const userDetailsController = async(req,res)=>{
  try{
    const userId = req.user._id;

    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        role : req.body.role,
        username : req.body.username
      }

    )
    return res.json({ message: "User updated successfully"});

  }
  catch(error){
    console.log(error);
    return res.status(500).json({ error: "Failed to save user address" });
  }
}
export default userDetailsController;