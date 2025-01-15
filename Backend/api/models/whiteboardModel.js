const mongoose = require("mongoose");

const whiteboardSchema = new mongoose.Schema({
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    actions: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            actionType: { type: String, required: true }, // e.g., "draw", "erase", "text"
            data: { type: mongoose.Schema.Types.Mixed }, // Action-specific data
            timestamp: { type: Date, default: Date.now },
        },
    ],
    createdAt: { type: Date, default: Date.now },
});

const Whiteboard = mongoose.model("Whiteboard", whiteboardSchema);
module.exports = Whiteboard;
