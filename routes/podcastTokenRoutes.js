const express = require('express');
const router = express.Router();
const { 
  generateToken, 
  getLiveStreams, // Get ongoing streams
  getUpcomingStreams, // Get upcoming streams
  getPastStreams  // Get past streams
} = require('../controllers/podcastTokenController');

router.post('/generate-token', generateToken);

router.get('/live-streams', getLiveStreams);

router.get('/upcoming-streams', getUpcomingStreams);

router.get('/past-streams', getPastStreams);

module.exports = router;
