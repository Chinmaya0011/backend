const mongoose = require('mongoose');
const { Schema } = mongoose;

const friendRequestSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
      required: true, 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FriendRequest', friendRequestSchema);
