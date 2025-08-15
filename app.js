const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const authRoutes = require("./routes/authRoutes");
const { protect } = require("./middleware/authMiddleware");

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('PulseVote API running!');
});

module.exports = app;

app.use("/api/auth", authRoutes);

app.get("/api/protected", protect, (req, res) => {
    res.json({
        message: `Welcome, user ${req.user.id}! You have accessed protected data.`,
        timestamp: new Date()
    });
});


