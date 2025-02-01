// routes/tokenRoutes.js
const express = require('express');
const router = express.Router();
const { generateToken, getLiveStreams } = require('../controllers/podcastTokenController');

router.post('/generate-token', generateToken);
router.get('/live-streams', getLiveStreams); // New GET route for fetching live streams

module.exports = router;
