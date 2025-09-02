const User = require("../models/user.model");

module.exports.getUserProfile = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    return res.status(200).json(user);
  } catch (error) {
    return res.satus(401).json(error);
  }
};
