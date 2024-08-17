import React, { useState } from "react";
import { Button, Icon, Box } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import URL from "./URL";
import Swal from "sweetalert2";

function CreateGroupModal({update}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [formDatas, setFormData] = useState({
        name: "",
        image: null,
        limit: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            if (name == 'image') {
                return { ...prev, [name]: e.target.files[0] };
            } else {
                return { ...prev, [name]: value };
            }
        })
    };

    const handleSubmit = async () => {
        try {
            
            // Retrieve the user object from localStorage
            const UserID = JSON.parse(localStorage.getItem('user'));
    
            // Create a new FormData object
            const formDataToSend = new FormData();
            formDataToSend.append('name', formDatas.name);
            formDataToSend.append('image', formDatas.image);
            formDataToSend.append('limit', formDatas.limit);
            formDataToSend.append('userId', UserID._id); // Append the user ID with a different key name
    
            // Send the POST request
            const res = await axios.post(`${URL.Endpoint}/group/create`, formDataToSend);
    
            console.log(res.data);
    
            // Handle response
            if (res.data?.success && update) {
                update();
            }
            Swal.fire({
                title: res.data?.message,
                icon: res.data?.success ? 'success' : 'error',
                confirmButtonText: 'Okay'
            });
    
        } catch (error) {
            console.error("Error creating group:", error);
            Swal.fire({
                title: 'Error creating group',
                text: 'Oops something went wrong',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        } 
            onClose();
    };
    


    return (
        <>

            <Box textAlign="left" mt={10}>
                <Button
                    rightIcon={<Icon as={FaPlus} />}
                    colorScheme="teal" size="lg" onClick={onOpen} px={6} py={4} fontSize="lg" borderRadius="full" boxShadow="lg" _hover={{ bg: "teal.600", transform: "scale(1.05)", boxShadow: "xl", }}
                    _active={{ bg: "teal.700", transform: "scale(0.95)", }} transition="all 0.2s ease-in-out" >
                    Create Group
                </Button>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create New Group</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl id="name" mb={4} isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input
                                name="name"
                                required
                                value={formDatas.name}
                                onChange={handleChange}
                                placeholder="Enter group name"
                            />
                        </FormControl>

                        <FormControl id="image" mb={4}>
                            <FormLabel>Image URL</FormLabel>
                            <Input
                                type="file"
                                name="image"
                                required
                                onChange={handleChange}
                                placeholder="Enter image URL"
                            />
                        </FormControl>

                        <FormControl id="limit" mb={4} isRequired>
                            <FormLabel>Limit</FormLabel>
                            <Input
                                name="limit"
                                type="number"
                                required
                                value={formDatas.limit}
                                onChange={handleChange}
                                placeholder="Enter member limit"
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                            Submit
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default CreateGroupModal;
