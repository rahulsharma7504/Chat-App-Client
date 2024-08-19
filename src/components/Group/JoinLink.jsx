const JoinGroupLink = ({ groupId }) => {
    const handleJoinGroup = () => {
        const token = localStorage.getItem('authToken'); // Assuming 'authToken' is the key for the stored token

        if (!token) {
            alert("Please log in first");
            // Optionally, redirect to login page
            // window.location.href = '/login';
            return;
        }

        // Proceed to join the group
        joinGroup(groupId, token);
    };

    const joinGroup = async (groupId, token) => {
        try {
            const response = await axios.post(
                `${URL.Endpoint}/group/join/${groupId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            // Handle the response (e.g., show success message)
        } catch (error) {
            console.error("Error joining group:", error.message);
        }
    };

    return (
        <Button onClick={handleJoinGroup}>
            Join Group
        </Button>
    );
};
