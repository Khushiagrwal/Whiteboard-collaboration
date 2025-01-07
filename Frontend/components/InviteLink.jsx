import React, { useState } from 'react';
import '../public/Css/Invite.css'; // Import the CSS file

function InviteLink({ connection }) {
  const socket = connection;
  const [link, setLink] = useState("");
  const [copySuccess, setCopySuccess] = useState("");

  const invitation = () => {
    const randomCode = Math.random().toString(36).substring(2, 10);
    const generatedLink = `${window.location.origin}/invite/${randomCode}`;
    setLink(generatedLink);
    setCopySuccess(""); // Reset the copy success message
  };

  const copyToClipboard = () => {
    if (link) {
      navigator.clipboard.writeText(link)
        .then(() => setCopySuccess("Link copied to clipboard!"))
        .catch(() => setCopySuccess("Failed to copy the link."));
    }
  };

  return (
    <div className="container">
      <h3>Generate and Copy Invitation Link</h3>
      {link && (
        <div>
          <p className="link-display">{link}</p>
          <button onClick={copyToClipboard}>Copy Link</button>
          {copySuccess && <p className="copy-message">{copySuccess}</p>}
        </div>
      )}
      <button onClick={invitation}>Generate</button>
    </div>
  );
}

export default InviteLink;
