import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import URL from '../components/Chunks/URL';

// Define the context
const groupContext = createContext();

// Define the provider component
export const GroupProvider = ({ children }) => { // Changed to GroupProvider
  const [startGroupChat, setStartGroupChat] = useState(null);
  const [groupData, setGroupsData] = useState({
    findGroup: [],
    findUserInGroup: []
  });

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  async function getGroups(userId) {
    try {
      const response = await axios.get(`${URL.Endpoint}/groups/${userId}`);
      setGroupsData(response.data.data);
    } catch (error) {
      console.error('Error fetching groups:', error.message);
    }
  }

  const getGroupInfo = async (id) => {
    try {
      const res = await axios.post(`${URL.Endpoint}/group/info`, { id });
      setStartGroupChat(res.data.findGroup);
    } catch (error) {
      Swal.fire({
        title: 'Oops! Something went wrong',
        icon: 'warning',
        confirmButtonText: 'Okay'
      });
      console.error('Error fetching user info:', error);
    }
  };

  return (
    <groupContext.Provider value={{ getGroups,groupData,setGroupsData,startGroupChat, setStartGroupChat,getGroupInfo }}>
      {children}
    </groupContext.Provider>
  );
};

// Custom hook to use the context
export const useGroup = () => useContext(groupContext);
