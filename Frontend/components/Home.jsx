import React, { useEffect, useState } from 'react';
import loadingicon from "/icons/loading.gif"; 
import "../public/Css/Home.css"
import Whiteboard from './Whiteboard';
import Chat from "./Chat";
import InviteLink from "./InviteLink"
import io from "socket.io-client"

function Home() {
  const [loading, setLoading] = useState(true);
  // const socket=io(process.env.REACT_APP_BACKEND_URL);
  const socket = io(import.meta.env.VITE_BACKEND_URL);

  const role="Admin"
 
  useEffect(() => {
    const timerId = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timerId);
  }, []);

  return (
    <>
      {loading ? (
        <div className="loading-container">
          <img src={loadingicon} alt="Loading Icon" className="loading-icon" />
        </div>
      ) : (
        <>
          <Whiteboard connection={socket}></Whiteboard>
          <Chat connection={socket}/>
          {role==="Admin" && <InviteLink connection={socket}></InviteLink>}
        </>
      )}
    </>
  );
}

export default Home;
