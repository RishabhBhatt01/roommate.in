// goal hai authentification ke baad koi page sirf wahi user access kar paaye , jo ek owner hai.
// req.user._id  se hame user ki id pata chalege
// req.user.role se hame pata chalega if a owner exists or not

const requireOwner = (req,res,next)=>{
  if(!req.user){
    return res.status(401).json({
      message : "User does not exist"
    })
  }

  if(req.user.role != 'owner'){
    return res.status(403).json({
      message : "User not an owner"
    })
  }
  next();

}

export default requireOwner;