const cookieToken = async (user) =>{
  return token = jwt.sign(
        {
          id : user._id,
          role:user.role
        },
        JWT_SECRET_KEY,
        {expiresIn : "7d"}
      );

}


export default cookieToken;