const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import MongoDB connection
const podcastRoutes = require('./routes/podcastTokenRoutes');
const webinarRoutes=require('./routes/webinarRoutes');
const friendRequestRoutes=require('./routes/friendRequestRoutes')
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const port = process.env.PORT || 3001;

// Allow multiple frontend origins
const corsOptions = {
  origin: [
    'http://localhost:3001', 
    'http://localhost:3000',
    'https://podcast-virid.vercel.app/'  
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};


// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send('Agora Token Generation Server');
});

// Token generation routes
app.use('/api', podcastRoutes);
app.use("/api/friends", friendRequestRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
