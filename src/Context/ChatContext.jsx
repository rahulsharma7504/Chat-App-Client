import React, { createContext, useContext, useState, useEffect } from 'react';
import io from 'socket.io-client'; // Ensure you have socket.io-client installed

// Create contexts for states, actions, and socket
const AppStateContext = createContext();
const AppActionsContext = createContext();
const SocketContext = createContext();

// Custom hooks for using the contexts
const useAppState = () => useContext(AppStateContext);
const useAppActions = () => useContext(AppActionsContext);
const useSocket = () => useContext(SocketContext);

// AppProvider component to wrap your app and provide state, actions, and socket
const AppProvider = ({ children }) => {
  const [messages, setMessages] = useState([]); // To store all messages
  const [oldMessages, setOldMessages] = useState([]); // To store old messages
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  const [socket, setSocket] = useState(null);

  // Initialize socket connection
  useEffect(() => {
    const socketInstance = io('http://localhost:4000'); // Your server URL
    setSocket(socketInstance);

    // Event listeners for socket
    socketInstance.on('connect', () => {
      console.log('Connected to socket server');
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    socketInstance.on('receiveMessage', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    socketInstance.on('oldMessages', (oldMessages) => {
      setOldMessages(oldMessages);
    });

    // Clean up on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Example actions (functions)
  const sendMessage = (message) => {
    try {
      socket.emit('sendMessage', message);
      setMessages(prevMessages => [...prevMessages, message]);
    } catch (err) {
      setError('Failed to send message');
    }
  };

  const deleteMessage = (id) => {
    socket.emit('deleteMessage', id);
    setMessages(prevMessages => prevMessages.filter(msg => msg.id !== id));
  };

  const updateMessage = (id, newMessage) => {
    socket.emit('updateMessage', { id, newMessage });
    setMessages(prevMessages =>
      prevMessages.map(msg => (msg.id === id ? newMessage : msg))
    );
  };

  // Define states and actions to be shared
  const states = { messages, oldMessages, currentUser, error };
  const actions = { sendMessage, deleteMessage, updateMessage };

  return (
    <AppStateContext.Provider value={states}>
      <AppActionsContext.Provider value={actions}>
        <SocketContext.Provider value={socket}>
          {children}
        </SocketContext.Provider>
      </AppActionsContext.Provider>
    </AppStateContext.Provider>
  );
};

export { AppProvider, useAppState, useAppActions, useSocket };
