import React, { useState } from 'react';
import '../public/Css/Invite.css';
import axios from "axios"

function InviteLink({userId}) {
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [emailList, setEmailList] = useState([]);

  const toggleSharePopup = () => setShowSharePopup(!showSharePopup);

  const handleAddEmail = () => {
    if (emailInput.trim() && !emailList.includes(emailInput.trim())) {
      setEmailList([...emailList, emailInput.trim()]);
      setEmailInput('');
    }
  };

  const handleRemoveEmail = (emailToRemove) => {
    setEmailList(emailList.filter((email) => email !== emailToRemove));
  };

  const generateLink = async () => {
    try {
      const link = `https://whiteboard-app.com/share/${Math.random().toString(36).substring(2, 15)}`;
      setGeneratedLink(link);
      navigator.clipboard.writeText(link); // Copy link to clipboard
      
      const res = await axios.post(
        "http://localhost:8080/api/share/invitee",
        { link, emails: emailList, userId }, // Send structured data
        { withCredentials: true }
      );
      console.log(res.data);
      alert('Link copied to clipboard and shared successfully!');
    } catch (error) {
      console.error("Error sharing the link:", error);
      alert("Failed to share the link. Please try again.");
    }
    setEmailList([])
  };
  

  return (
    <div className="invite-container">
      
      <button className="share-btn" onClick={toggleSharePopup}>
        Share
      </button>

      {showSharePopup && (
        <div className="share-popup">
          <button
                  className="remove-share"
                  onClick={() => setShowSharePopup(!showSharePopup)}
                >
                &times;
          </button>
          <h3>Invite Collaborators</h3>
          <input
            type="email"
            className="email-input"
            placeholder="Enter email address"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <button className="add-email-btn" onClick={handleAddEmail}>
            Add Email
          </button>
          <div className="email-list">
            {emailList.map((email, index) => (
              <span key={index} className="email-item">
                {email}
                <button
                  className="remove-email-btn"
                  onClick={() => handleRemoveEmail(email)}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
          {emailList.length>=1 &&
          <button className="generate-link-btn" onClick={generateLink}>
            Generate Link
          </button>}
          {/* {generatedLink && (
            <div className="generated-link">
              <p>Generated Link:</p>
              <a href={generatedLink} target="_blank" rel="noopener noreferrer">
                {generatedLink}
              </a>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
}

export default InviteLink;
