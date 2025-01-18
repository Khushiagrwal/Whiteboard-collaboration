import React, { useState } from "react";
import axios from "axios";
import "../public/Css/JoinRoom.css";

function JoinRoom({ userId }) {
  const [linkInput, setLinkInput] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleJoinRoom = async () => {
    try {
      setError(""); // Reset error
      setSuccessMessage(""); // Reset success message

      if (!linkInput.trim()) {
        setError("Please enter a valid link.");
        return;
      }

      const roomId = linkInput.split("/share/")[1]; // Extract room ID from link
      if (!roomId) {
        setError("Invalid link format.");
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/api/rooms/join",
        { roomId, userId },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setSuccessMessage("Successfully joined the room!");
        setLinkInput(""); // Clear input
      }
    } catch (err) {
      console.error(err);
      setError("Failed to join the room. Please check the link or try again.");
    }
  };

  return (
    <div className="join-room-container">
      <div className="join-header">
        <h3>Join a Room</h3>
        <p className="subtext">
          Connect and collaborate seamlessly by entering the invitation link
          shared with you.
        </p>

      <div className="image-container">
        {/* <img
          src="https://i.ytimg.com/vi/RH26Ncrvwsw/maxresdefault.jpg"
          alt="Virtual Whiteboard"
          className="header-image"
        /> */}
        <iframe
            width="560"
            height="315"
            className="header-image"
            src="https://www.youtube.com/embed/RH26Ncrvwsw?autoplay=1&loop=1&controls=0&modestbranding=1&rel=1&showinfo=1&mute=1&playlist=RH26Ncrvwsw"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowfullscreen
        ></iframe>
      </div>

      <input
        type="text"
        className="link-input"
        placeholder="Paste the invitation link here"
        value={linkInput}
        onChange={(e) => setLinkInput(e.target.value)}
      />
      <button className="join-room-btn" onClick={handleJoinRoom}>
        Join Room
      </button>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <div className="instructions">
        <h4>How to join a room?</h4>
        <ol>
          <li>Copy the invitation link shared by the room host.</li>
          <li>Paste the link into the input field above.</li>
          <li>Click "Join Room" to connect instantly.</li>
        </ol>
      </div>

      {/* <div className="footer-image">
        <img
          src="https://xplane.com/wp-content/uploads/2022/04/XPL_Blog_Virtual-Whiteboards_Header-1818x1024.png"
          alt="Virtual Whiteboard"
          className="footer-image-content"
        />
      </div> */}
      </div>
    </div>
  );
}

export default JoinRoom;
