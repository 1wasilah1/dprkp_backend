const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).populate('authmenu');
    if (!user) {
      return res.status(400).json({ msg: 'Username tidak ditemukan' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Password salah' });
    }

    const payload = {
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        authmenu: user.authmenu,
      }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).send('Server Error');
  }
};

// Fungsi getMe
const getMe = (req, res) => {
    // req.user sudah ada karena middleware authMiddleware sudah memverifikasi token
    const user = req.user;

    // Mengembalikan data pengguna yang sedang terautentikasi
    res.status(200).json({
      _id: user.id,
      username: user.username,
      role: user.role,
    });
};

module.exports = { loginUser, getMe };
