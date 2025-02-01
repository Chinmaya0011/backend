// routes/tokenRoutes.js
const express = require('express');
const router = express.Router();
const { generateToken } = require('../controllers/tokenController');

router.post('/generate-token', generateToken);

module.exports = router;
