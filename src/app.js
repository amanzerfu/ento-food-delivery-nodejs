const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const shopRoutes = require('./routes/shopRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());  // Enable CORS for all routes

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', shopRoutes);

module.exports = app;
