import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import URL from '../components/Chunks/URL';

// Define the context
const ChatContext = createContext();

// Define the provider component
export const ChatProvider = ({ children }) => {
  const [chatUser, setChatUser] = useState(null);
  const [usersData, setUsersData] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const [messages, setMessages] = useState([]);


  const getUserInfo = async (id) => {
    try {
      const res = await axios.post(`${URL.Endpoint}/user/info`, { id });
      setChatUser(res.data);
      setMessages([]);  // Reset messages when changing chat user
    } catch (error) {
      Swal.fire({
        title: 'Oops! Something went wrong',
        icon: 'warning',
        confirmButtonText: 'Okay'
      });
      console.error('Error fetching user info:', error);
    }
  };
  
  const getAllUsers = async () => {
    try {
      if (user && user._id) {
        const res = await axios.post(`${URL.Endpoint}/users`, { id: user._id });
        setUsersData(res.data); 
      } else {
        console.error('User ID not found in local storage.');
      }
    } catch (error) {
      Swal.fire({
        title: 'Oops! Something went wrong',
        icon: 'warning',
        confirmButtonText: 'Okay'
      })
      console.error('Error fetching users:', error);
    }
  };

  return (
    <ChatContext.Provider value={{ chatUser,setMessages, usersData,messages, getUserInfo ,getAllUsers}}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook to use the context
export const useChat = () => useContext(ChatContext);
