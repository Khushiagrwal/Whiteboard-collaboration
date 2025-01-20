import React, { useEffect, useState } from "react";
import axios from "axios";
import "../public/Css/JoinRoom.css";
import { useSocket } from "../context/socket";


function JoinRoom({ userId }) {
  const [linkInput, setLinkInput] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [studentEmail,setStudentEmail]=useState("");
  const socket =useSocket();
  
  const handleJoinRoom = async () => {
    try {
      setError(""); // Reset error
      setSuccessMessage(""); // Reset success message

      // if (!linkInput.trim()) {
      //   setError("Please enter a valid link.");
      //   return;
      // }
      // const roomId = linkInput.split("/share/")[1]; // Extract room ID from link
      const roomId=linkInput.trim();
      if (!linkInput.split("/share/")[1]) {
        setError("Invalid link format.");
        return;
      }
      const response = await axios.post(
        "http://localhost:8080/api/rooms/join",
        { roomId, studentEmail },
        { withCredentials: true }
      );
      // console.log(response.data);

      if (response.status === 200) {
        setSuccessMessage("Successfully joined the room!");
        setLinkInput(""); // Clear input
      }
      
    } catch (err) {
      // console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Server-provided error message
      } else {
        setError("An unexpected error occurred."); // Generic fallback
      }
    }
  };

  useEffect(()=>{
    let userData = localStorage.getItem('persist:root');
    if (userData) {
      userData = JSON.parse(userData);
      const userInfo = JSON.parse(userData.user).userInfo.user;
      setStudentEmail(userInfo.email);
    }
  },[])

  return (
    <div className="join-room-container">
      <div className="join-header">
        <h3>Join a Room</h3>
        <p className="subtext">
          Connect and collaborate seamlessly by entering the invitation link
          shared with you.
        </p>

      <div className="image-container">
        <img
          src="https://scotthwsnyder.com/wp-content/uploads/2019/08/peoplepickerillustrated.gif"
          alt="Virtual Whiteboard"
          className="header-image"
        />
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
      </div>
    </div>
  );
}

export default JoinRoom;
