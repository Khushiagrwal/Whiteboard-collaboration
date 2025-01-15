// import React, { useEffect, useState } from 'react';
// import loadingicon from "/icons/loading.gif"; 
// import "../public/Css/Home.css"
// import Whiteboard from './Whiteboard';
// import Chat from "./Chat";
// import InviteLink from "./InviteLink"
// import io from "socket.io-client"
// import { useAuth0 } from '@auth0/auth0-react';

// function Home() {

//   const {loginWithRedirect,user,isAuthenticated,logout}=useAuth0();
  
//   const [loading, setLoading] = useState(true);
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     if (isAuthenticated) {
//       const newSocket = io(import.meta.env.VITE_BACKEND_URL);
//       setSocket(newSocket);
//       return () => {
//         newSocket.disconnect();
//       };
//     }
//   }, [isAuthenticated]);

//   useEffect(() => {
//     const timerId = setTimeout(() => {
//       setLoading(false);
//     }, 5000);
//     return () => clearTimeout(timerId);
//   }, []);

//   return (
//     <>
//       {loading ? (
//         <div className="loading-container">
//           <img src={loadingicon} alt="Loading Icon" className="loading-icon" />
//         </div>
//       ) : (
//         <>
//           {socket && <Whiteboard connection={socket}></Whiteboard>}
//           {/* <Chat connection={socket}/>
//           {role==="Admin" && <InviteLink connection={socket}></InviteLink>} */}
//           {!isAuthenticated ?<button onClick={() => loginWithRedirect()}>GET STARTED</button>: <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
//       Log Out
//     </button>}
//         </>
//       )}
//     </>
//   );
// }

// export default Home;

import React from 'react';

function Home() {
  return (
    <>
      Home
    </>
  )
}

export default Home