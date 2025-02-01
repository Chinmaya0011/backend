const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const tokenRoutes = require('./routes/tokenRoutes');

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

// Allow all origins to access the API
app.use(cors());

// Middleware
app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send('Agora Token Generation Server');
});

// Token generation routes
app.use('/api', tokenRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
