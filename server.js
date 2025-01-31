const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const{RtcTokenBuilder,RtcRole}=require("agora-access-token");

dotenv.config();
const app=express();
const port=3000;
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send(req.url)
})
app.post("/generate-token", (req, res) => {
  const { channelName, uid, role } = req.body;

  if (!channelName || !uid || !role) {
    return res.status(400).json({ error: "Channel name, UID, and role are required" });
  }

  const appId = process.env.AGORA_APP_ID;
  const appCertificate = process.env.AGORA_APP_CERTIFICATE;
  const rtcRole = role === "host" ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER; // Set role based on input
  const expirationTimeInSeconds = 3600; // Token expires in 1 hour

  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCertificate,
    channelName,
    uid,
    rtcRole,
    privilegeExpiredTs
  );

  res.json({ token });
});


app.listen(port,()=>{
    console.log(`server started on port ${port}`)
})