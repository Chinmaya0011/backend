const { RtcTokenBuilder, RtcRole } = require('agora-token');
const LiveStream = require('../models/liveStreamModel');

// Function to generate token
const generateToken = async (req, res) => {
  const { channelName, uid, role, title, username, eventTime } = req.body;

  // Ensure all required fields are present
  if (!channelName || uid == null || !role || !title || !username || !eventTime) {
    return res.status(400).json({ error: 'Channel name, UID, role, title, username, and eventTime are required' });
  }

  // Retrieve App ID and App Certificate from environment variables
  const appId = process.env.AGORA_APP_ID;
  const appCertificate = process.env.AGORA_APP_CERTIFICATE;

  // Ensure App ID and Certificate are available
  if (!appId || !appCertificate) {
    return res.status(500).json({ error: 'Agora App ID and App Certificate are required' });
  }

  // Define role for the token (host or subscriber)
  const rtcRole = role === 'host' ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;

  // Token expiration time (1 hour)
  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000); // Get current timestamp in seconds
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  try {
    // Generate the RTC token with UID
    const token = RtcTokenBuilder.buildTokenWithUid(
      appId,
      appCertificate,
      channelName,
      parseInt(uid, 10), // Ensure UID is an integer
      rtcRole,
      privilegeExpiredTs
    );

    // Save live stream details in the database
    const newLiveStream = new LiveStream({
      title,
      username,
      channelName,
      uid,
      role,
      token,
      eventTime: new Date(eventTime), // Ensure the event time is in the correct format
    });

    // Save stream info to the database
    await newLiveStream.save();
    console.log(`Token created successfully at ${new Date()}`, token);

    // Send the token as a response
    res.json({ token });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to get all live streams
const getLiveStreams = async (req, res) => {
  try {
    const liveStreams = await LiveStream.find();
    res.json(liveStreams);
  } catch (error) {
    console.error('Error fetching live streams:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to get upcoming live streams
const getUpcomingStreams = async (req, res) => {
  try {
    const upcomingStreams = await LiveStream.find({
      eventTime: { $gt: new Date() }, // Filters for streams happening after the current time
    }).sort({ eventTime: 1 }); // Sort by event time ascending
    res.json(upcomingStreams);
  } catch (error) {
    console.error('Error fetching upcoming streams:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to get past live streams
const getPastStreams = async (req, res) => {
  try {
    const pastStreams = await LiveStream.find({
      eventTime: { $lt: new Date() }, // Filters for streams happening before the current time
    }).sort({ eventTime: -1 }); // Sort by event time descending
    res.json(pastStreams);
  } catch (error) {
    console.error('Error fetching past streams:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to get a live stream by ID
const getStreamById = async (req, res) => {
  const { id } = req.params;

  try {
    const stream = await LiveStream.findById(id);

    if (!stream) {
      return res.status(404).json({ error: 'Stream not found' });
    }

    res.json(stream);
  } catch (error) {
    console.error('Error fetching stream by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { generateToken, getLiveStreams, getUpcomingStreams, getPastStreams, getStreamById };
