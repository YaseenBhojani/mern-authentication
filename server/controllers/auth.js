const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateAccessToken } = require("../utils/helpers");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (password.length < 6)
      return res.status(400).json({
        type: "error",
        message: "Password must be at least 6 character.",
      });

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    const token = generateAccessToken(email);
    res.status(201).json({ message: "Signup successful", token });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ status: "error", message: "Email is already in use" });
    }
    res.status(400).json({ status: "error", message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ status: "error", message: "User not found!" });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res
        .status(401)
        .json({ status: "error", message: "Incorrect password" });
    }

    const token = generateAccessToken(email);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
};

module.exports = {
  signup,
  login,
};
