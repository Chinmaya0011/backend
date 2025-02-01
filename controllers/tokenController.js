// controllers/tokenController.js
const { RtcTokenBuilder, RtcRole } = require('agora-token');

const generateToken = (req, res) => {
  const { channelName, uid, role } = req.body;

  if (!channelName || uid == null || !role) {
    return res.status(400).json({ error: 'Channel name, UID, and role are required' });
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
    console.log(token)
    res.json({ token });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { generateToken };
