import React, { useEffect, useRef, useState } from 'react';
import { FaPencilAlt, FaEraser, FaCircle } from 'react-icons/fa'; // Import icons
import io from 'socket.io-client';
import '../public/Css/Whiteboard.css'; // Import the styling
import {useNavigate} from "react-router-dom"
import InviteLink from './InviteLink';

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const socketRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [brushSize, setBrushSize] = useState(5); 
  const [currentTool, setCurrentTool] = useState('pencil'); 
  const [user,setUser]= useState("");
  const [email,setEmail]=useState("");
  const [userId,setUserId]=useState();
  const navigate=useNavigate();

  useEffect(() => {
    try {
      let userData = localStorage.getItem('persist:root');
      if (userData) {
        userData = JSON.parse(userData);
        const userInfo = JSON.parse(userData.user).userInfo.user;
        setUserId(userInfo._id);
        setUser(userInfo.name);
        setEmail(userInfo.email);
      }
    } catch (error) 
    {
      navigate("/signin")
      console.error('Error parsing user data from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    if (user && !socketRef.current) {
      // Create socket connection only if it's not already created
      socketRef.current = io("http://localhost:8080/");
      socketRef.current.emit("register", email);  // Register with the user email
      console.log(socketRef.current)
      // Cleanup function to disconnect the socket on unmount or when `user` changes
      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
          // localStorage.removeItem('persist:root')
          socketRef.current = null;  // Reset the socket reference
        }
      };
    }
  }, [user, email]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set up canvas scaling
    const scaleCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;
      ctx.scale(ratio, ratio); // Scale the context to match
    };

    scaleCanvas();
    window.addEventListener('resize', scaleCanvas);

    // Handle drawing data from other clients
    // socket.on('draw', (data) => {
    //   const { x, y, lastX, lastY, tool, brushSize } = data;
    //   ctx.lineWidth = brushSize;
    //   if (tool === 'eraser') {
    //     ctx.globalCompositeOperation = 'destination-out'; // Eraser effect
    //   } else {
    //     ctx.globalCompositeOperation = 'source-over'; // Pencil effect
    //   }
    //   ctx.beginPath();
    //   ctx.moveTo(lastX, lastY);
    //   ctx.lineTo(x, y);
    //   ctx.stroke();
    // });

    // return () => {
    //   socket.off('draw'); // Cleanup listener on component unmount
    //   window.removeEventListener('resize', scaleCanvas);
    // };
  }, []);

  const getCursorPosition = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ratio = canvas.width / rect.width; // Account for scaling
    return {
      x: (e.clientX - rect.left) * ratio,
      y: (e.clientY - rect.top) * ratio,
    };
  };

  const startDrawing = (e) => {
    e.preventDefault(); // Prevent default behavior for mobile (scrolling)
    setDrawing(true);
    const position = getCursorPosition(e);
    setLastPosition(position);
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  const draw = (e) => {
    if (!drawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = lastPosition;
    const newPosition = getCursorPosition(e);

    // socket.emit('draw', {
    //   x: newPosition.x,
    //   y: newPosition.y,
    //   lastX: x,
    //   lastY: y,
    //   tool: currentTool,
    //   brushSize: brushSize,
    // });

    ctx.lineWidth = brushSize;

    if (currentTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out'; // Eraser effect
    } else {
      ctx.globalCompositeOperation = 'source-over'; // Pencil effect
    }

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(newPosition.x, newPosition.y);
    ctx.stroke();
    setLastPosition(newPosition);

  };

  const changeTool = (tool) => {
    setCurrentTool(tool);
  };

  const changeBrushSize = (size) => {
    setBrushSize(size);
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    e.preventDefault(); // Prevent default behavior for mobile (scrolling)
    startDrawing(e.touches[0]); // Use the first touch point
  };

  const handleTouchMove = (e) => {
    e.preventDefault(); // Prevent default behavior for mobile (scrolling)
    draw(e.touches[0]); // Use the first touch point
  };

  const handleTouchEnd = () => {
    stopDrawing();
  };
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
    <nav className="navbar">
      <div className="navbar-left">
      <h1 className="logo">Whiteboard App</h1>
      </div>
      <div className="navbar-right">
      {user && <InviteLink  userId={userId}/>}
      <div className="profile" onClick={toggleDropdown}>
      <img
        src="https://i.pinimg.com/originals/3d/0a/d6/3d0ad6219d1d58ce1b9ce45e1b2b5754.png"
        alt="Profile"
        className="profile-pic"
      />
    </div>
    {showDropdown && (
      <div className="dropdown">
        <button
                className="remove-share"
                onClick={() => setShowDropdown(!showDropdown)}
              >
              &times;
        </button>
        <span className="dropdown-name">USERNAME : {user}</span>
        <span className="dropdown-name">ID: {userId}</span>
        <span className="dropdown-email">EMAIL :{email}</span>
      </div>
    )}
    </div>
    </nav>

    <div className="whiteboard-container">
      <div className="toolbar">
        <button onClick={() => changeTool('pencil')} title="Pencil">
          <FaPencilAlt size={24} />
        </button>
        <button onClick={() => changeTool('eraser')} title="Eraser">
          <FaEraser size={24} />
        </button>
        <button onClick={() => changeBrushSize(5)} title="Small Brush">
          <FaCircle size={12} />
        </button>
        <button onClick={() => changeBrushSize(10)} title="Medium Brush">
          <FaCircle size={18} />
        </button>
        <button onClick={() => changeBrushSize(15)} title="Large Brush">
          <FaCircle size={24} />
        </button>
      </div>
      <canvas
        ref={canvasRef}
        className="whiteboard-canvas"
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
    </div>
    </>
  );
};

export default Whiteboard;
