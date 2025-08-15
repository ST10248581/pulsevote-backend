require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const authRoutes = require('./routes/authRoutes');
const { protect } = require('./middleware/authMiddleware');

const app = express();
app.use(express.json());
app.use(cors({ origin: 'https://localhost:5173', credentials: true }));

const PORT = process.env.PORT || 5000;

const options = {
    key: fs.readFileSync('ssl/key.pem'),
    cert: fs.readFileSync('ssl/cert.pem'),
};

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);

app.get('/api/protected', protect, (req, res) => {
    res.json({ message: `Welcome, user ${req.user.id}! You have accessed protected data.` });
});

https.createServer(options, app).listen(PORT, () => {
    console.log('Server running at https://localhost:' + PORT);
});
