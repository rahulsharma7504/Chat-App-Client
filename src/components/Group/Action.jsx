import Swal from 'sweetalert2';
import axios from 'axios';

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
                const response = await axios.put(`${URL.Endpoint}/group/messages/${id}`, {
                    // Add the necessary data for the update
                    message: "Updated message content",
                });
                Swal.fire(
                    'Updated!',
                    'Your message has been updated.',
                    'success'
                );
                console.log(response.data); // Handle the updated data as needed
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
                const response = await axios.delete(`${URL.Endpoint}/group/messages/${id}`);
                Swal.fire(
                    'Deleted!',
                    'Your message has been deleted.',
                    'success'
                );
                console.log(response.data); // Handle the deletion as needed
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
