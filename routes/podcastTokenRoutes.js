const express = require('express');
const router = express.Router();
const { 
  generateToken, 
  getLiveStreams, // Get ongoing streams
  getUpcomingStreams, // Get upcoming streams
  getPastStreams,  // Get past streams
  getStreamById  // Get stream by ID
} = require('../controllers/podcastTokenController');

// Route for generating token
router.post('/generate-token', generateToken);

// Routes for different stream states
router.get('/live-streams', getLiveStreams);
router.get('/upcoming-streams', getUpcomingStreams);
router.get('/past-streams', getPastStreams);

// Route to get a single stream by ID
router.get('/stream/:id', getStreamById);  // New route for fetching stream by ID

module.exports = router;
