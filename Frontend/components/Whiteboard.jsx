// import React, { useRef, useEffect, useState } from "react";
// import "../public/Css/Whiteboard.css"
// import { useNavigate } from 'react-router-dom';


// const Whiteboard = ({connection}) => {
//   const navigate = useNavigate();

//   const socket=connection
//   const canvasRef = useRef(null);
//   const contextRef = useRef(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [xcord, setXcord] = useState(0);
//   const [ycord, setYcord] = useState(0);
//   const [room, setRoom] = useState("");

//   const joinRoom = () => {
//     socket.emit("joinRoom", room);
//   };

//   const leaveRoom = () => {
//     socket.emit("leaveRoom", room);
//     navigate('/');
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     canvas.width = window.innerWidth * 0.8;
//     canvas.height = 400;

//     const context = canvas.getContext("2d");
//     context.lineCap = "round";
//     context.lineWidth = 3;
//     context.strokeStyle = "purple";
//     contextRef.current = context;

//     socket.on("draw", ({ x, y, start }) => {
//       if (start) {
//         contextRef.current.beginPath();
//         contextRef.current.moveTo(x, y);
//       } else {
//         contextRef.current.lineTo(x, y);
//         contextRef.current.stroke();
//       }
//     });

//     return () => {
//       socket.off("draw");
//     };
//   }, []);

//   const startDrawing = ({ nativeEvent }) => {
//     const { offsetX, offsetY } = nativeEvent;
//     contextRef.current.beginPath();
//     contextRef.current.moveTo(offsetX, offsetY);
//     setIsDrawing(true);

//     socket.emit("draw", { x: offsetX, y: offsetY, start: true });
//   };

//   const draw = ({ nativeEvent }) => {
//     if (!isDrawing) return;

//     const { offsetX, offsetY } = nativeEvent;
//     setXcord(offsetX);
//     setYcord(offsetY);

//     socket.emit("draw", { x: offsetX, y: offsetY, start: false });

//     contextRef.current.lineTo(offsetX, offsetY);
//     contextRef.current.stroke();
//   };

//   const stopDrawing = () => {
//     contextRef.current.closePath();
//     setIsDrawing(false);
//   };

//   const clearCanvas = () => {
//     const canvas = canvasRef.current;
//     contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
//   };

//   return (
//     <div className="whiteboard-container">
//       <div className="whiteboard-input">
//         <input
//           type="text"
//           placeholder="Enter Room"
//           value={room}
//           onChange={(e) => setRoom(e.target.value)}
//         />
//         <button onClick={joinRoom}>Join Room</button>
//         <button onClick={leaveRoom}>Leave Room</button>
//       </div>
//       <h1 className="whiteboard-header">Whiteboard</h1>
//       <p className="whiteboard-coordinates">
//         Coordinates: {xcord}, {ycord}
//       </p>
//       <canvas
//         ref={canvasRef}
//         className="whiteboard-canvas"
//         onMouseDown={startDrawing}
//         onMouseMove={draw}
//         onMouseUp={stopDrawing}
//         onMouseLeave={stopDrawing}
//       ></canvas>
//       <div className="whiteboard-clear-btn">
//         <button onClick={clearCanvas}>Clear</button>
//       </div>
//     </div>
//   );
// };

// export default Whiteboard;

import React, { useEffect, useRef, useState } from 'react';
import { FaPencilAlt, FaEraser, FaCircle } from 'react-icons/fa'; // Import icons
import io from 'socket.io-client';
import '../public/Css/Whiteboard.css'; // Import the styling

const socket = io(); // Connect to the Socket.IO server

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [brushSize, setBrushSize] = useState(5); // Default brush size
  const [currentTool, setCurrentTool] = useState('pencil'); // Pencil or Eraser

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
    socket.on('draw', (data) => {
      const { x, y, lastX, lastY, tool, brushSize } = data;
      ctx.lineWidth = brushSize;
      if (tool === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out'; // Eraser effect
      } else {
        ctx.globalCompositeOperation = 'source-over'; // Pencil effect
      }
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
    });

    return () => {
      socket.off('draw'); // Cleanup listener on component unmount
      window.removeEventListener('resize', scaleCanvas);
    };
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

    socket.emit('draw', {
      x: newPosition.x,
      y: newPosition.y,
      lastX: x,
      lastY: y,
      tool: currentTool,
      brushSize: brushSize,
    });

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

  return (
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
  );
};

export default Whiteboard;
