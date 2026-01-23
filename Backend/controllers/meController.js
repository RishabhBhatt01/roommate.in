const me = (req, res) => {
  return res.status(200).json({
    id: req.user._id,
    role: req.user.role
  });
};
export default me;