const me = (req, res) => {
  return res.status(200).json({
    id: req.user._id,
    role: req.user.role,
    isProfileComplete : req.user.isProfileComplete,
    isOwnerDetailsComplete : req.user.isOwnerDetailsComplete,
    isCreatedRoom : req.user.isCreatedRoom
  });
};
export default me;