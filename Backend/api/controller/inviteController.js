const Room = require("../models/roomModel");

const inviteController = async (req, res) => {
  try {
    const { link, emails, userId } = req.body;

    // Validate the input
    if (!link || !emails || !emails.length || !userId) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // Find or create the room
    let room = await Room.findOne({ _id: userId });
    if (!room) {
      room = new Room({ name:link, admin: userId, students: [] });
    }

    // Add invitees to the room
    const uniqueEmails = [...new Set(emails)]; // Remove duplicate emails
    uniqueEmails.forEach((email) => {
    //   if (!room.students.includes(email)) {
        room.students.push(email); // Assuming emails are stored as student identifiers
    //   }
    });

    await room.save(); // Save the updated room

    res.status(200).json({ message: "Link shared and room updated", room });
  } catch (error) {
    console.error("Error in inviteController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = inviteController;
