// models/liveStreamModel.js
const mongoose = require('mongoose');

const liveStreamSchema = new mongoose.Schema({
  title: { type: String, required: true },
  username: { type: String, required: true },
  channelName: { type: String, required: true },
  uid: { type: Number, required: true },
  role: { type: String, required: true },
  token: { type: String, required: true },
  eventTime: { type: Date, required: true }, // Add eventTime field
});

module.exports = mongoose.model('LiveStream', liveStreamSchema);
