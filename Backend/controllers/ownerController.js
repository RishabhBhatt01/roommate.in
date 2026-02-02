import User from '../models/User.js';
import Owner from '../models/Owner.js';


const ownerController = async(req,res) =>{
  try{

    const {ownerEmail,ownerAadhaar} = req.body;

    const userId = req.user._id;
    if (req.user.isOwnerDetailsComplete) {
  return res.status(400).json({
    error: "Owner address already submitted"
  });
}

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

    const isOwner = await Owner.findOne({userId});
if (isOwner) {
  return res.status(400).json({
    error: "Owner details already submitted"
  });
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

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        isOwnerDetailsComplete : true,
      },
      { new: true }
    );
    
    res.status(200).json({message : "success"});

  }catch(error){
    console.error(error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
export default ownerController