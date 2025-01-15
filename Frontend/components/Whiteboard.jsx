import React, { useRef, useEffect, useState } from "react";
import "../public/Css/Whiteboard.css"
import { useNavigate } from 'react-router-dom';


const Whiteboard = ({connection}) => {
  const navigate = useNavigate();

  const socket=connection
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [xcord, setXcord] = useState(0);
  const [ycord, setYcord] = useState(0);
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    socket.emit("joinRoom", room);
  };

  const leaveRoom = () => {
    socket.emit("leaveRoom", room);
    navigate('/');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.8;
    canvas.height = 400;

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.lineWidth = 3;
    context.strokeStyle = "purple";
    contextRef.current = context;

    socket.on("draw", ({ x, y, start }) => {
      if (start) {
        contextRef.current.beginPath();
        contextRef.current.moveTo(x, y);
      } else {
        contextRef.current.lineTo(x, y);
        contextRef.current.stroke();
      }
    });

    return () => {
      socket.off("draw");
    };
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);

    socket.emit("draw", { x: offsetX, y: offsetY, start: true });
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = nativeEvent;
    setXcord(offsetX);
    setYcord(offsetY);

    socket.emit("draw", { x: offsetX, y: offsetY, start: false });

    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="whiteboard-container">
      <div className="whiteboard-input">
        <input
          type="text"
          placeholder="Enter Room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={joinRoom}>Join Room</button>
        <button onClick={leaveRoom}>Leave Room</button>
      </div>
      <h1 className="whiteboard-header">Whiteboard</h1>
      <p className="whiteboard-coordinates">
        Coordinates: {xcord}, {ycord}
      </p>
      <canvas
        ref={canvasRef}
        className="whiteboard-canvas"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      ></canvas>
      <div className="whiteboard-clear-btn">
        <button onClick={clearCanvas}>Clear</button>
      </div>
    </div>
  );
};

export default Whiteboard;
