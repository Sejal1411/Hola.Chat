const express = require("express");
const router = express.Router();
const UserModel = require('../models/userModel');
const {generateToken} = require('../Config/generateToken');

router.post('/signup', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
  
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: 'Fill all the required fields' });
    }
  
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const userExist = await UserModel.findOne({ email });
      if (userExist) {
      return res.status(400).json({ error: 'User already exists' });
    }

   // Check if username is already taken
    const userNameExist = await UserModel.findOne({ name });
      if (userNameExist) {
      res.status(400);
    throw new Error('UserName already taken');
    }

    const user = await UserModel.create({ name, email, password });
     if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
    } else {
    res.status(400).json({ error: 'Registration Error' });
    }
});

module.exports = router; 