const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    socketId: { type: String, required: true, unique: true }, // Socket.IO session ID
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    isConnected: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

sessionSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

const Session = mongoose.model("Session", sessionSchema);
module.exports = Session;
