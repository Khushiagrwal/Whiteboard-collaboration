import React, { createContext, useContext } from 'react';
import { getSocket } from './socket';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = getSocket();

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
