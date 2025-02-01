const { RtcTokenBuilder, RtcRole } = require('agora-token');
const LiveStream = require('../models/liveStreamModel'); // Import the model


const generateToken = async (req, res) => {
  const { channelName, uid, role, title, username, eventTime } = req.body;

  if (!channelName || uid == null || !role || !title || !username || !eventTime) {
    return res.status(400).json({ error: 'Channel name, UID, role, title, username, and eventTime are required' });
  }

  const appId = process.env.AGORA_APP_ID;
  const appCertificate = process.env.AGORA_APP_CERTIFICATE;

  if (!appId || !appCertificate) {
    return res.status(500).json({ error: 'Agora App ID and App Certificate are required' });
  }

  const rtcRole = role === 'host' ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;
  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  try {
    const token = RtcTokenBuilder.buildTokenWithUid(
      appId,
      appCertificate,
      channelName,
      parseInt(uid, 10),
      rtcRole,
      privilegeExpiredTs
    );

    const newLiveStream = new LiveStream({
      title,
      username,
      channelName,
      uid,
      role,
      token,
      eventTime: new Date(eventTime), 
    });

    await newLiveStream.save();

    res.json({ token });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getLiveStreams = async (req, res) => {
  try {
    const liveStreams = await LiveStream.find(); // Fetch all live streams from the database
    res.json(liveStreams);
  } catch (error) {
    console.error('Error fetching live streams:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUpcomingStreams = async (req, res) => {
  try {
    const upcomingStreams = await LiveStream.find({
      eventTime: { $gt: new Date() }, 
    }).sort({ eventTime: 1 }); 
    res.json(upcomingStreams);
  } catch (error) {
    console.error('Error fetching upcoming streams:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getPastStreams = async (req, res) => {
  try {
    const pastStreams = await LiveStream.find({
      eventTime: { $lt: new Date() }, 
    }).sort({ eventTime: -1 }); 
    res.json(pastStreams);
  } catch (error) {
    console.error('Error fetching past streams:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { generateToken, getLiveStreams, getUpcomingStreams, getPastStreams };
