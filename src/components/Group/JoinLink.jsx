import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const JoinLink = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [userId, setUserId] = useState(null);
    const { id } = useParams();


    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserId(parsedUser._id);
        }else{
            navigate('/login');
            return; 
        }
    }, []);

    useEffect(() => {
        if (userId) {
            const sendToBackend = async () => {
                try {
                    const res = await axios.post(`http://localhost:4000/api/group/join_user/${id}`, { userId });
                    setMessage(res.data.message);

                } catch (error) {
                    console.error("Error joining group:", error);
                }
            };

            sendToBackend();
        }
    }, [userId, id,message]);

    return (
        <>
            <h1>Joining Group: {id}</h1>
           {message ? message : 'loading...'}
        </>
    );
}

export default JoinLink;
