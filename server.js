const express = require('express');
const app = express();
const db = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const menuRoutes = require('./routes/menuRoutes');
db.connectDB(); // 👈 panggil fungsi koneksi

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/menu', menuRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
