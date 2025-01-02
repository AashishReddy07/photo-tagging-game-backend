const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const pool = require('./config/db');

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Test database connection
pool.connect()
    .then(() => console.log('PostgreSQL connected'))
    .catch((err) => console.error('Connection error', err.stack));

// Routes
app.use('/api/users', require('./routes/userRoutes'));

// Root route
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
