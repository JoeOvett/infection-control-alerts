require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['https://infection-control-alerts.vercel.app'],
    credentials: true
}));

// The database simulation
const users = {
    admin: { id: 1, username: 'admin', password: 'secret' }
};

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users[username];

    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Only set to true in production
        sameSite: 'None',
        expires: new Date(Date.now() + 3600000) // 1 hour
    });

    res.json({ success: true, message: 'Logged in successfully' });
});

// Authentication middleware
function authenticateToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: `Welcome User ${req.user.userId}` });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
