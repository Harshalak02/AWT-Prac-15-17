
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const User = require('./models/user.schema');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'charusat', 
  resave: false,
  saveUninitialized: true,
}));

app.post('/register', async (req, res) => {
  const { usernm, paswrd } = req.body;

  try {
    const existingUser = await User.findOne({ username: usernm });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = await User.create({ username: usernm, password: paswrd });

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  const { usernm, paswrd } = req.body;

  try {
    const user = await User.findOne({ username: usernm });

    if (!user || user.password !== paswrd) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ usernm }, 'charusat'); 
    res.cookie('token', token, { httpOnly: true });
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
