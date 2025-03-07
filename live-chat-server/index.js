require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const supabase = require('./supabaseClient');
const userRoutes = require('./Routes/userRoutes');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://sejalxcreates:inmTv4oEKI6D7WRC@hellochatdb.yrswt.mongodb.net/")
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

app.use('/user', userRoutes);

app.post('/send-message', async (req, res) => {
  const { sender_id, receiver_id, content } = req.body;

  try {
    const { data, error } = await supabase
      .from('messages')
      .insert([{ sender_id, receiver_id, content }]);

    if (error) {
      console.error('Supabase insert error:', error);
      console.error('Error details:', error.details);
      console.error('Error hint:', error.hint);
      console.error('Error code:', error.code);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: 'Message sent successfully', data });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/messages', async (req, res) => {
  const { userId } = req.query;

  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Supabase select error:', error);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ messages: data });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/test-supabase', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Supabase test error:', error);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: 'Supabase connection successful', data });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('user/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Validate the incoming data
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  try {
    // Save the user data to the database
    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, password }]);

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: 'User registered successfully', data });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

