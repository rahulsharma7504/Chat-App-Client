import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../../Styles/Home.module.css'; // Different styles for mobile chat
import moment from 'moment';
import Swal from 'sweetalert2';
import URL from '../Chunks/URL';

const Chat = ({oldMessages,handleMessageDelete,handleMessageUpdate,messages,sendMessage}) => {
  const { id } = useParams();
  const [chatUser, setChatUser] = useState(null);
//   const [messages, setMessages] = useState([]);
  const [chatMessage, setChatMessage] = useState('');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.post(`${URL.Endpoint}/user/info`, { id });
        setChatUser(res.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, [id]);

  // Fetch messages and other related functionalities here...

  return (
    <div className={styles.chatContainer} >
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
                <div className={styles.chatBody} >
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
  );
};

export default Chat;
