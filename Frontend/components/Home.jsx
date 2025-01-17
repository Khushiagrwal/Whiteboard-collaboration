import React, { useEffect, useState } from "react";
import loadingicon from "/icons/loading.gif";
import "../public/Css/Home.css";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // Function to check for access_token in cookies
  const checkAuthToken = async () => {
    try {
      const response = await axios.get("http://localhost:8080/authenticate", {
        withCredentials: true, // Include cookies in the request
      });
    
      console.log(response.data); // "yes you are authenticate"
      return true;
    } catch (error) {
      // console.error("Error:", error);
      return false;
    }
  };

  useEffect(() => {
    // Check for authentication when the component mounts
    const timerId = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timerId);
  }, []);

  const handleButtonClick = async () => {
    const isAuthenticated = await checkAuthToken(); // Wait for the result
    if (isAuthenticated) {
      navigate("/whiteboard"); // Redirect to whiteboard if authenticated
    } else {
      navigate("/signin"); // Redirect to sign-in if not authenticated
    }
  };
  
  return (
    <>
      {loading ? (
        <div className="loading-container">
          <img src={loadingicon} alt="Loading Icon" className="loading-icon" />
        </div>
      ) : (
        <div className="home-container">
          <Header />
          <header className="home-header">
            <h1>Welcome to Whiteboard Collaboration</h1>
            <p>
              Collaborate, innovate, and create seamlessly with our interactive
              whiteboard tools.
            </p>
            <button className="get-started-btn" onClick={handleButtonClick}>
              Get Started
            </button>
          </header>

          <section className="about">
            <h2>About Whiteboard Collaboration</h2>
            <p>
              Whiteboard Collaboration is a platform designed to empower teams,
              educators, and creative professionals to work together effectively.
              With real-time collaboration, customizable tools, and seamless
              integrations, you can bring your ideas to life faster and more
              efficiently.
            </p>
            <p>
              Whether you're brainstorming ideas, managing projects, or
              conducting online training, our platform adapts to your needs,
              making remote collaboration as seamless as working in person.
            </p>
          </section>

          <section className="features">
            <div className="feature-item">
              <img
                src="https://leadworklife.com/wp-content/uploads/2020/04/leaders-map.png"
                alt="Leaders Map"
              />
              <h3>Collaborative Leadership</h3>
              <p>
                Empower teams with shared decision-making and collaborative tools
                that drive engagement and creativity.
              </p>
            </div>
            <div className="feature-item">
              <img
                src="https://images.ctfassets.net/w6r2i5d8q73s/1aQw4gRFC458THtJ54mWm6/1d5593cd94cccb93ad812fa7a95e27d6/L-persona-map.png"
                alt="Canva Whiteboard"
              />
              <h3>Creative Whiteboards</h3>
              <p>
                Bring your ideas to life with dynamic and customizable
                whiteboards tailored to your specific needs.
              </p>
            </div>
            <div className="feature-item">
              <img
                src="https://connecteur.co/wp-content/uploads/Mural.png"
                alt="Miro Product Release"
              />
              <h3>Seamless Integration</h3>
              <p>
                Connect with your favorite tools like Slack, Google Workspace,
                and Microsoft Teams to streamline your workflow.
              </p>
            </div>
          </section>

          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;
