const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const menuRoutes = require('./routes/menuRoutes');
const taxItemRoutes = require("./routes/taxItemRoutes");
const authRoutes = require('./routes/authRoutes');
const { authMiddleware } = require('./middleware/auth');

db.connectDB(); // 👈 panggil fungsi koneksi

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/menu', menuRoutes);
app.use("/api/tax", taxItemRoutes);
app.use('/api/auth', authRoutes);


app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({ msg: 'Selamat datang pengguna terverifikasi!' });
});

  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
