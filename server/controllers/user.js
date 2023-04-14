const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ data: users });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to get users", message: error.message });
  }
};

module.exports = { getAllUsers };
