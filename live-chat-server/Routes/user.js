const express = require("express");
// const { loginController, registerController } = require("../Controllers/userController");
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
  
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }
  
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const user = await User.findOne({ username });
});

module.exports = router; 