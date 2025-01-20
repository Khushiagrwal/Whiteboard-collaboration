const Room = require("../models/roomModel");

const joinRoom = async (req, res) => {
    try {
        const { roomId, studentEmail } = req.body;
        // Validate input
        if (!roomId || !studentEmail) {
            return res.status(400).json({ message: "Invalid input data" });
        }

        // Find the room by link
        const room = await Room.findOne({ name: roomId });
        if (!room) {
            return res.status(404).json({ message: "Room not found. Please try again." });
        }
        // Check if the email is already in the room
        if (!room.students.includes(studentEmail)) 
            return res.status(400).json({ message: "You are not authorized to join this room" });
        
        return res.status(200).json({ message: "Successfully joined the room" });

    } catch (error) {
        console.error("Error joining room:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = joinRoom;
