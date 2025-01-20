const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true }, // room name 
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    students: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
