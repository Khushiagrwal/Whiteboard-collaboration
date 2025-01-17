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
import React from "react";
import  { useEffect, useState } from 'react';
import loadingicon from "/icons/loading.gif";
import "../public/Css/Home.css";
import Header from "./Header";
import Footer from "./Footer";
import {useNavigate} from "react-router-dom";

const Home = () => {

  const navigate=useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
        const timerId = setTimeout(() => {
          setLoading(false);
        }, 3000);
        return () => clearTimeout(timerId);
      }, []);

      const handleButtonClick = () => {
        navigate('/whiteboard');
      };
    
  return (
    <>
    {loading ?(
        <div className="loading-container">
          <img src={loadingicon} alt="Loading Icon" className="loading-icon" />
        </div>):(
    <div className="home-container">
      <Header/>
      <header className="home-header">
        <h1>Welcome to Whiteboard Collaboration</h1>
        <p>Collaborate, innovate, and create seamlessly with our interactive whiteboard tools.</p>
        <button className="get-started-btn"  onClick={handleButtonClick}>Get Started</button>
      </header>

      <section className="about">
        <h2>About Whiteboard Collaboration</h2>
        <p>
          Whiteboard Collaboration is a platform designed to empower teams, educators, and creative professionals to work together effectively. 
          With real-time collaboration, customizable tools, and seamless integrations, you can bring your ideas to life faster and more efficiently. 
        </p>
        <p>
          Whether you're brainstorming ideas, managing projects, or conducting online training, our platform adapts to your needs, making remote 
          collaboration as seamless as working in person.
        </p>
      </section>

      <section className="features">
        {/* <h2>Features</h2> */}
        <div className="feature-item">
          <img src="https://leadworklife.com/wp-content/uploads/2020/04/leaders-map.png" alt="Leaders Map" />
          <h3>Collaborative Leadership</h3>
          <p>Empower teams with shared decision-making and collaborative tools that drive engagement and creativity.</p>
        </div>
        <div className="feature-item">
          <img src="https://images.ctfassets.net/w6r2i5d8q73s/1aQw4gRFC458THtJ54mWm6/1d5593cd94cccb93ad812fa7a95e27d6/L-persona-map.png" alt="Canva Whiteboard" />
          <h3>Creative Whiteboards</h3>
          <p>Bring your ideas to life with dynamic and customizable whiteboards tailored to your specific needs.</p>
        </div>
        <div className="feature-item">
          <img src="https://miro.com/blog/wp-content/uploads/2023/09/Miro_Blog_April-Product-Release-768x403.png" alt="Miro Product Release" />
          <h3>Seamless Integration</h3>
          <p>Connect with your favorite tools like Slack, Google Workspace, and Microsoft Teams to streamline your workflow.</p>
        </div>
        
      </section>

      <section className="use-cases">
        <h2>Use Cases</h2>
        <ul>
          <li><strong>Education:</strong> Create engaging lesson plans and collaborate with students in real time.</li>
          <li><strong>Corporate:</strong> Facilitate brainstorming sessions, project planning, and virtual meetings.</li>
          <li><strong>Creative Teams:</strong> Design and prototype concepts with a team, no matter where they are.</li>
          <li><strong>Remote Work:</strong> Stay connected and productive with distributed teams.</li>
        </ul>
      </section>

      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-item">
          <p>
            "This platform has transformed the way our team collaborates. The whiteboard features are intuitive and powerful."
          </p>
          <p>- Sarah M., Team Leader</p>
        </div>
        <div className="testimonial-item">
          <p>
            "A must-have tool for anyone looking to improve team collaboration and creativity. Highly recommended!"
          </p>
          <p>- John D., Product Manager</p>
        </div>
      </section>

      <footer className="home-footer">
        <p>Start collaborating with ease and efficiency. <a href="/signup">Sign up</a> to get started!</p>
      </footer>
      <Footer/>
    </div>)}
    </>
  );
};

export default Home;
