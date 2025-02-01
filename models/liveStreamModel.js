// models/liveStreamModel.js
const mongoose = require('mongoose');

const liveStreamSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    channelName: {
      type: String,
      required: true,
    },
    uid: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: ['host', 'viewer'],
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Create a model based on the schema
const LiveStream = mongoose.model('LiveStream', liveStreamSchema);

module.exports = LiveStream;
