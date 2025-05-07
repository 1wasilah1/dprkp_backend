const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const menuRoutes = require('./routes/menuRoutes');
const taxItemRoutes = require("./routes/taxItemRoutes");
const authRoutes = require('./routes/authRoutes');
const { authMiddleware } = require('./middleware/auth');
const contentRoutes = require('./routes/contentRoutes');
const newsRoutes = require('./routes/newsRoutes');
const strukturOrganisasiRoutes = require('./routes/strukturOrganisasiRoutes');
const sopPPIDRoutes = require('./routes/sop-ppid.routes');
const path = require('path');
const visiMisiRoutes = require("./routes/visiMisiRoutes");

db.connectDB(); // 👈 panggil fungsi koneksi

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/menu', menuRoutes);
app.use("/api/tax", taxItemRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);

app.use('/uploads', express.static('uploads'));

//ppid
app.use('/api/sop-ppid/dokumen', sopPPIDRoutes);

// API untuk berita
app.use('/api/news', newsRoutes);  // Route untuk menarik berita



// Routes
app.use('/api/strukturOrganisasi', strukturOrganisasiRoutes);

app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({ msg: 'Selamat datang pengguna terverifikasi!' });
});

//Visi Misi
app.use('/api/visi-misi', visiMisiRoutes);

  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on 127.0.0.1:${PORT}`));
