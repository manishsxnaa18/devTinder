const mongoose = require('mongoose');

const connectionRequestSchema = mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ['ignored', 'interested', 'accepted', 'rejected'],
      message: `{VALUE} is incorrect status type`
    }
  }
}, {
  timestamps: true
});

connectionRequestSchema.index({ fromUserId: 1 });

connectionRequestSchema.index({ toUserId: 1 });

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre("save", function (next) {
  const connectionReq = this;
  if (connectionReq.fromUserId.equals(connectionReq.toUserId)) {
    throw new Error("You can not send request to your self")
  }
  next();
});

connectionRequestSchema.methods.validateConnectionRequest = async function (toUserId) {
  const connection = this;
  console.log({ connection })
  isConnectionSend = (connection || []).find(({ toUserId: tUID }) => tUID === toUserId) || false;
  console.log({ isConnectionSend })
  return isConnectionSend;
}

const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequest;