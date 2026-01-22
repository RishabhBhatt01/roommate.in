import User from '../models/User.js';
import Owner from '../models/Owner.js';


const ownerController = async(req,res) =>{
  try{
    console.log("req.body:", req.body);
    console.log("req.user:", req.user);

    const {ownerEmail,ownerAadhaar} = req.body;

    const userId = req.user._id;

    if(!userId){
      return res.status(401).json({error : " User is not authorized "});
        }

    const userInfo = await User.findById(userId);

    if(!userInfo){
      return res.status(404).json({error : "User not found"});
    }

    const name = userInfo.username;
    const role = userInfo.role;

    if(role != "owner"){
      return res.status(401).json({error : "User is not an owner"});
    }

    const newOwner = new Owner({
      userId : userId,
      ownerName : name,
      ownerEmail,
      ownerAadhaar
    })

    const savedOwner = await newOwner.save();
    if(!savedOwner){
      return res.status(500).json({error : "Internal server error"});
    }
    res.status(200).json({message : "succes"});
    console.log("ownersaved",savedOwner);

  }catch(error){
    console.error("Detailed error",error)
    return error;
  }
}
export default ownerController