const expressAsyncHandler = require('express-async-handler');
const UserModel = require('../models/userModel');
const generateToken = require('../Config/generateToken');

const registerController = expressAsyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;



  // Check for pre-existing user
  const userExist = await UserModel.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Check if username is already taken
  const userNameExist = await UserModel.findOne({ name });
  if (userNameExist) {
    res.status(400);
    throw new Error('UserName already taken');
  }

  // Create an entry in the db
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
    res.status(400);
    throw new Error('Registration Error');
  }
});

const loginController = expressAsyncHandler(async (req, res) => {
  const { name, password } = req.body;

  const user = await UserModel.findOne({ name });

  if (!user) {
    res.status(401);
    throw new Error('Invalid UserName or Password');
  }

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid UserName or Password');
  }
});

module.exports = { registerController, loginController };