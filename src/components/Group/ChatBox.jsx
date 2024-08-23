import React, { useEffect, useRef, useState } from 'react';
import styles from '../../Styles/Home.module.css';
import axios from 'axios';
import URL from '../Chunks/URL';
import io from 'socket.io-client';
import moment from 'moment';
import Swal from 'sweetalert2';

// Initialize socket outside of the component to prevent multiple connections
const socket = io('http://localhost:4000/group');

const ChatBox = ({ chatUser }) => {
    const [chatMessage, setChatMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    const endOfMessagesRef = useRef(null); // Reference for the end of the chat messages

    useEffect(() => {
        if (chatUser) {
            setChatMessages([]); // Clear previous messages when chatUser changes

            // Request old messages for the selected chatUser's group
            socket.emit('fetchOldMessages', { groupId: chatUser._id });

            // Listen for old messages from the server
            socket.on('loadOldMessages', (messages) => {
                // Append the old messages to the chatMessages state
                const formattedMessages = messages.map((msg) => ({
                    id: msg._id,
                    sender: msg.userId === userId ? 'sender' : 'receiver',
                    content: msg.message,
                    timestamp: moment(msg.createdAt).format('hh:mm')
                }));
                setChatMessages(formattedMessages);
                scrollToBottom(); // Scroll to the bottom when old messages are loaded
            });
        }

        // Listen for new messages from the server
        const handleNewMessage = (data) => {
            setChatMessages((prev) => [
                ...prev,
                {
                    id: data._id,
                    sender: data.userId === userId ? 'sender' : 'receiver',
                    content: data.message,
                    timestamp: moment(data.createdAt).format('hh:mm')
                }
            ]);
            scrollToBottom(); // Scroll to the bottom when a new message is added
        };

        socket.on('newMessage', handleNewMessage);

        // Clean up socket listeners on component unmount or chatUser change
        return () => {
            socket.off('newMessage', handleNewMessage);
            socket.off('loadOldMessages'); // Correct clean-up
        };
    }, [chatUser, userId]);

    const handleSend = async (e) => {
        e.preventDefault();

        if (chatMessage.trim()) {
            try {
                const res = await axios.post(`${URL.Endpoint}/group/messages`, {
                    message: chatMessage,
                    userId: userId,
                    groupId: chatUser._id
                });

                // Add the message to the sender's chat box immediately
                setChatMessages((prev) => [
                    ...prev,
                    { id: res.data._id, sender: 'sender', content: res.data.message, timestamp: moment(res.data.createdAt).format('hh:mm') }
                ]);

                // Broadcast the message to others
                socket.emit('receiveMessage', res.data);

                setChatMessage('');
                scrollToBottom(); // Scroll to the bottom when a message is sent
            } catch (error) {
                console.error("Failed to send message", error);
            }
        }
    };

    // Function to handle actions like delete or update
    const handleAction = async (id) => {
        Swal.fire({
            title: 'What do you want to do?',
            text: "You can either update or delete the message.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Update',
            cancelButtonText: 'Delete',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                // If the user clicks "Update"
                try {
                    const { value: newMessage } = await Swal.fire({
                        title: 'Enter your new message',
                        input: 'text',
                        inputPlaceholder: 'Type your new message here...',
                        showCancelButton: true,
                    });
    
                    if (newMessage) {
                        // Call API to update the message
                        const response = await axios.put(`${URL.Endpoint}/group/messages/update/${id}`, {
                            message: newMessage
                        });
    
                        // Update the chatMessages state immediately
                        setChatMessages((prev) =>
                            prev.map((msg) => msg.id === id ? { ...msg, content: newMessage } : msg)
                        );
    
                        // Emit the updated message to others
    
                        Swal.fire(
                            'Updated!',
                            'Your message has been updated.',
                            'success'
                        );
                    }
                } catch (error) {
                    Swal.fire(
                        'Failed!',
                        'Failed to update the message.',
                        'error'
                    );
                    console.error("Failed to update message", error);
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // If the user clicks "Delete"
                try {
                    // Call API to delete the message
                    await axios.delete(`${URL.Endpoint}/group/messages/delete/${id}`);
    
                    // Update the chatMessages state to remove the deleted message
                    setChatMessages((prev) => prev.filter((msg) => msg.id !== id));
    
                    // Emit the deleted message to others
    
                    Swal.fire(
                        'Deleted!',
                        'Your message has been deleted.',
                        'success'
                    );
                } catch (error) {
                    Swal.fire(
                        'Failed!',
                        'Failed to delete the message.',
                        'error'
                    );
                    console.error("Failed to delete message", error);
                }
            }
        });
    };
    

    // Function to scroll to the bottom of the chat messages
    const scrollToBottom = () => {
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollTo(0, endOfMessagesRef.current.scrollHeight);
        }
    };

    return (
        <>
            {chatUser && (
                <div className={styles.chatContainer}>
                    <div className={styles.chatHeader}>
                        <div className={styles.logo}>
                            <img src={chatUser.image} className='rounded' width={'33px'} alt="" />
                            <div className={styles.userInfo}>
                                <h3>{chatUser.name}</h3>
                            </div>
                        </div>
                        <div className={styles.videoCallIcon}>
                            <i className="fas fa-video"></i>
                        </div>
                    </div>
                    <div className={styles.chatBody} ref={endOfMessagesRef}>
                        {chatMessages.map((msg, index) => (
                            <div key={index} className={msg.sender === 'sender' ? styles.senderMessage : styles.receiverMessage}>
                                <div className={styles.messageContent} onDoubleClick={() => handleAction(msg.id)}>
                                    <p>{msg.content}</p>
                                    <small>{msg.timestamp}</small>
                                </div>
                            </div>
                        ))}
                        {/* Invisible div to scroll to the bottom */}
                        {/* <div  /> */}
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
                            <button type="button" onClick={handleSend} className="btn btn-primary">
                                <i className="fas fa-paper-plane"></i>
                            </button>
                            
                            <div className={styles.fileIcon}>
                                <i type="file" className="fas fa-paperclip"></i>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBox;
