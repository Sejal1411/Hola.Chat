const express = require("express");
const router = express.Router();
const UserModel = require('../models/userModel');
const generatedToken  = require('../Config/generateToken');

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

      if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ error: 'Fill all the required fields' });
      }

      // Check if passwords match
      if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }

      // Check if user already exists
      const userExist = await UserModel.findOne({ email });
      if (userExist) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const user = await UserModel.create({ name, email, password });

      // Send success response
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generatedToken(user._id),
      });
  } catch (error) {
      console.error("❌ Signup Error:", error); // Log full error details
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/login', async(req, res) => {
  try{
    const {email, password} = req.body;

    if(!email || !password){
      return res.status(400).json({ error: 'Both fields are required' });
    }

    const user = await UserModel.findOne({ email });
    if(!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isPasswordMatch = await user.matchPassword(password);
    if(!isPasswordMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = generatedToken(user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      // isAdmin: user.isAdmin,
      token: token,
    });

  } catch (error) {
    console.error("❌ Login Error:", error); // Log full error details
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
