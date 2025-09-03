const nearbyRoom = async(req,res) =>{
  try{
    const userid = req.user._id;
    const range = parseFloat(req.query.range) || 10;

    if(!userid){
      return res.status(404).json({error : "User not found"})
    }

    return res.status(200).json({
      message : "REACHED CONTROLLER SUCCESSFULLY",
      range : range

    });

  }catch(error){
    console.log(error);
  }
}

export default nearbyRoom;