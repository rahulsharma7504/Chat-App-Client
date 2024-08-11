import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import styles from '../../Styles/Home.module.css';
import Swal from 'sweetalert2';
import moment from 'moment';

const ENDPOINT = "http://localhost:4000";
const API_USERS_URL = `${ENDPOINT}/api/users`;
const API_USER_INFO_URL = `${ENDPOINT}/api/user/info`;

const Home = () => {
  const containerRef = useRef(null);
  const [usersData, setUsersData] = useState([]);
  const [chatUser, setChatUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [oldMessages, setOldMessages] = useState([]);

  var socketInstance = null;

  useEffect(() => {
    getAllUsers();

    if (user && user._id) {
      socketInstance = io(`${ENDPOINT}/status`, {
        auth: {
          token: user._id
        }
      });

      socketInstance.on('connect', () => {
      });

      socketInstance.on('disconnect', () => {
      });

      socketInstance.on('receiveMessage', (msg) => {
        setMessages(prev => [...prev, { sender: 'receiver', content: msg.message, timestamp: new Date() }]);
      }); 

      setSocket(socketInstance);

      return () => {
        socketInstance.disconnect();
      };
    } else {
      console.log('No user found in local storage, not connecting to socket');
    }
  }, [user, chatUser]);

  //
  // Actions for Message
  const handleMessageDelete = async (id) => {
    const res = await axios.post(`${ENDPOINT}/api/message/${id}`);
    console.log(res.data);
    Swal.fire({
      title: res.data.msg,
      icon: 'success',
      confirmButtonText: 'Okay'
    })

  };

  // Load Old Messages

  const loadMessages = useCallback(() => {
    if (chatUser && socket) {
      socket.emit('loadMessage', { senderId: user._id, reciverId: chatUser._id });

      socket.on('loadChatMessage', (messages) => {
        setOldMessages(messages);
      });
    }
  }, [chatUser, socket]);


  
  const handleMessageUpdate = useCallback(async (id, message) => {
    try {
      const res = await axios.post(`${ENDPOINT}/api/updatemessage`, { id, message });
      console.log(res.data);
      // Reload messages after updating
      loadMessages();
    } catch (error) {
      console.error('Error updating message:', error);
    }
  }, [ENDPOINT, loadMessages]);



  useEffect(() => {
    loadMessages();
  }, [chatUser, socket]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!chatMessage || !chatUser) return;

    try {
      const res = await axios.post(`${ENDPOINT}/api/chatUser`, {
        senderId: user._id,
        message: chatMessage,
        reciverId: chatUser._id
      });

      setMessages(prev => [...prev, { sender: 'sender', content: res.data.message, timestamp: new Date() }]);
      if (socket) {
        socket.emit('message', { sender: 'sender', message: chatMessage, senderId: user._id, reciverId: chatUser._id });
      }

      setChatMessage('');
    } catch (error) {
      Swal.fire({
        title: 'Error while sending message',
        icon: 'warning',
        confirmButtonText: 'Okay'
      })
      console.error('Error sending message:', error);
    }
  };

  const getAllUsers = async () => {
    try {
      if (user && user._id) {
        const res = await axios.post(API_USERS_URL, { id: user._id });
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

  const getUserInfo = async (id) => {
    try {
      const res = await axios.post(API_USER_INFO_URL, { id });
      setChatUser(res.data);
      setMessages([]);  // Reset messages when changing chat user
    } catch (error) {
      Swal.fire({
        title: 'Oops! Something went wrong',
        icon: 'warning',
        confirmButtonText: 'Okay'
      })
      console.error('Error fetching user info:', error);
    }
  };

  // Ensure the chat container scrolls to the bottom when messages or oldMessages change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
    }
  }, [messages, oldMessages]);

  // Ensure the chat container scrolls to the bottom when a new chat user is selected
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
    }
  }, [chatUser]);

  // Logout functionality

  
  return (
    <>
      <div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-12">
            {usersData.length > 0 ? (
              <>
                <div className={styles.inlineContent}>
                </div>
                <hr />
                <ul className={styles.userList}>
                  <hr className={styles.verticalLine} />
                  {usersData.map((user) => (
                    <li key={user._id} className={styles.userItem}>
                      <div className={styles.userInfo} onClick={() => getUserInfo(user._id)}>
                        <img src={user.image} alt={user.name} className={styles.userImage} />
                        <div className={styles.userDetails}>
                          <span className={styles.userName}>{user.name}</span>
                          <span className={styles.userStatus}>{user.is_online ? 'Online' : ''}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p>No users found.</p>
            )}
          </div>
          {chatUser && (
            <div className="col-md-8 col-12">
              <div className={styles.chatContainer} ref={containerRef}>
                <div className={styles.chatHeader}>
                  <div className={styles.logo}>
                    <img src={chatUser.image} className='rounded' width={'33px'} alt="" />
                    <div className={styles.userInfo}>
                      <h3>{chatUser.name}</h3>
                    </div>
                  </div>
                  <h6 className={styles.userStatus}>{chatUser.is_online && 'Online'}</h6>
                  <div className={styles.videoCallIcon}>
                    <i className="fas fa-video"></i>
                  </div>
                </div>
                <div className={styles.chatBody} ref={containerRef}>
                  {oldMessages && oldMessages.map((msg, index) => (
                    <div key={index} className={msg.receiverId === user._id ? styles.receiverMessage : styles.senderMessage} onDoubleClick={() => Swal.fire({
                      title: 'Choose an action',
                      icon: 'info',
                      showCancelButton: true,
                      confirmButtonColor: '#d33',
                      cancelButtonColor: '#3085d6',
                      confirmButtonText: '<i class="fas fa-trash-alt"></i> Delete',
                      cancelButtonText: '<i class="fas fa-edit"></i> Update',
                      customClass: {
                        popup: 'small-alert', // Custom class for making the alert smaller
                      },
                      width: '300px',
                    }).then((result) => {
                      if (result.isConfirmed) {
                        // Handle the Delete action
                        handleMessageDelete(msg._id)

                      } else if (result.dismiss === Swal.DismissReason.cancel) {
                        //Handle the Cancel action
                        Swal.fire({
                          title: 'Edit Message',
                          input: 'text',  // Use 'textarea' for multi-line input
                          inputValue: msg.message,  // Pre-fill the input with the current message
                          showCancelButton: true,
                          confirmButtonColor: '#3085d6',
                          cancelButtonColor: '#d33',
                          confirmButtonText: 'Update',
                          cancelButtonText: 'Cancel',
                          customClass: {
                            popup: 'small-alert', // Custom class for making the alert smaller
                          },
                          inputValidator: (value) => {
                            if (!value) {
                              return 'You need to write something!'
                            }
                          }
                        }).then((result) => {
                          if (result.isConfirmed) {
                            const updatedMessage = result.value;  // The updated message from the input field
                            handleMessageUpdate(msg._id, updatedMessage);  // Call your function to handle the update
                          }
                        });

                        // handleMessageUpdate(msg._id)
                      }
                    })
                    }>
                      <div className={styles.messageContent}>
                        <img
                          src={msg.receiverId === user._id ? chatUser.image : user.image}
                          className='rounded'
                          width={'33px'}
                          alt=""
                        />
                        <p>{msg.message}</p>
                        <small>{moment(msg.createdAt).format('h:mm A')}</small>
                      </div>
                    </div>
                  ))}

                  {messages.map((msg, index) => (
                    <div key={index} className={msg.sender === 'sender' ? styles.senderMessage : styles.receiverMessage}  onDoubleClick={() => Swal.fire({
                      title: 'Choose an action',
                      icon: 'info',
                      showCancelButton: true,
                      confirmButtonColor: '#d33',
                      cancelButtonColor: '#3085d6',
                      confirmButtonText: '<i class="fas fa-trash-alt"></i> Delete',
                      cancelButtonText: '<i class="fas fa-edit"></i> Update',
                      customClass: {
                        popup: 'small-alert', // Custom class for making the alert smaller
                      },
                      width: '300px',
                    }).then((result) => {
                      if (result.isConfirmed) {
                        // Handle the Delete action
                        handleMessageDelete(msg._id)

                      } else if (result.dismiss === Swal.DismissReason.cancel) {
                        //Handle the Cancel action
                        Swal.fire({
                          title: 'Edit Message',
                          input: 'text',  // Use 'textarea' for multi-line input
                          inputValue: msg.content,  // Pre-fill the input with the current message
                          showCancelButton: true,
                          confirmButtonColor: '#3085d6',
                          cancelButtonColor: '#d33',
                          confirmButtonText: 'Update',
                          cancelButtonText: 'Cancel',
                          customClass: {
                            popup: 'small-alert', // Custom class for making the alert smaller
                          },
                          inputValidator: (value) => {
                            if (!value) {
                              return 'You need to write something!'
                            }
                          }
                        }).then((result) => {
                          if (result.isConfirmed) {
                            const updatedMessage = result.value;  // The updated message from the input field
                            handleMessageUpdate(msg._id, updatedMessage);  // Call your function to handle the update
                          }
                        });

                        // handleMessageUpdate(msg._id)
                      }
                    })
                    }>
                      <div className={styles.messageContent}>
                        <img
                          src={msg.sender === 'sender' ? user.image : chatUser.image}
                          className='rounded'
                          width={'33px'}
                          alt=""
                        />
                        <p>{msg.content}</p>
                        <small>{msg.timestamp.toLocaleTimeString()}</small>

                      </div>
                    </div>
                  ))}

                </div>
                <div className={styles.chatFooter}>
                  <div className={styles.messageInputContainer}>
                    <input
                      type="text"
                      placeholder="Type a message"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="form-control"
                    />
                    <button type="button" onClick={sendMessage} className="btn btn-primary">
                      <i className="fas fa-paper-plane"></i>
                    </button>
                    <div className={styles.fileIcon}>
                      <i className="fas fa-paperclip"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
