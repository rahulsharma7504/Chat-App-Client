import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Text, Spinner, Alert, AlertIcon } from '@chakra-ui/react'; // Import Chakra UI components

const JoinLink = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null); // State to handle error messages
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [userId, setUserId] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserId(parsedUser._id);
        } else {
            navigate('/login');
            return;
        }
    }, []);

    useEffect(() => {
        if (userId) {
            const sendToBackend = async () => {
                try {
                    const res = await axios.post(`http://localhost:4000/api/group/join_user/${id}`, { userId });
                    setMessage(res.data.message); // Set success message
                    setError(null); // Clear any previous error
                } catch (error) {
                    if (error.response && error.response.status === 400) {
                        setError(error.response.data.message); // Set error message for group limit
                    } else {
                        setError("An unexpected error occurred while joining the group.");
                    }
                    console.error("Error joining group:", error);
                } finally {
                    setLoading(false); // Stop loading when request is complete
                }
            };

            sendToBackend();
        }
    }, [userId, id]);

    return (
        <Box p={5} maxW="400px" mx="auto" mt="10">
            <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={4}>
                Joining Group: {id}
            </Text>

            {/* Show loading spinner */}
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                    <Spinner size="xl" />
                </Box>
            ) : (
                <>
                    {/* Show error message if there is an error */}
                    {error && (
                        <Alert status="error" mb={4}>
                            <AlertIcon />
                            {error}
                        </Alert>
                    )}

                    {/* Show success message if there is a message */}
                    {message && (
                        <Alert status="success" mb={4}>
                            <AlertIcon />
                            {message}
                        </Alert>
                    )}

                    {/* Back to home button */}
                    <Button colorScheme="teal" onClick={() => navigate('/home')}>
                        Back to Home
                    </Button>
                </>
            )}
        </Box>
    );
};

export default JoinLink;
