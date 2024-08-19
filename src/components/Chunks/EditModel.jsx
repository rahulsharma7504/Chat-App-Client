import React, { useEffect, useState } from "react";
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

function EditModel({ data,update}) {
    const {name,limit,id}=data;
    const [formData, setFormData] = useState({
        name: "",
        image: null,
        limit: "",
    });
    const { isOpen, onOpen, onClose } = useDisclosure();
   

    useEffect(() => {
        setFormData({
            name: name || "",
            image: null,
            limit: limit || "",
        });

    }, [name, limit]);


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
    
            // Create a new FormData object
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            if(formData.image){
                formDataToSend.append('image', formData.image);
            }
            formDataToSend.append('limit', formData.limit);
    
            // Send the POST request
            const res = await axios.post(`${URL.Endpoint}/group/edit/${id}`,formData);
            
            // Update the group in the parent component
            update()
            // Clear form data
            setFormData({
                name: "",
                image: null,
                limit: "",
            });
    
    
            // Handle response
            
            Swal.fire({
                title: res.data?.message,
                icon: res.data?.success ? 'success' : 'error',
                confirmButtonText: 'Okay'
            });
    
        } catch (error) {
            console.error("Error creating group:", error);
            Swal.fire({
                title: 'some error occurred',
                text: 'Oops something went wrong',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        } 
            onClose();
    };
    


    return (
        <>

            <Box textAlign="left" mt={4}>
                <Button
                    rightIcon={<Icon as={FaPlus} />}
                    colorScheme="teal"
                    size="lg" // Changed from 'lg' to 'sm'
                    onClick={onOpen}
                    px={2} // Reduced padding on x-axis
                    my={2} // Reduced padding on x-axis
                    py={1} // Reduced padding on y-axis
                    fontSize="xs" // Reduced font size
                    borderRadius="full"
                    boxShadow="lg"
                    _hover={{
                        bg: "teal.600",
                        transform: "scale(1.05)",
                        boxShadow: "xl",
                    }}
                    _active={{
                        bg: "teal.700",
                        transform: "scale(0.95)",
                    }}
                    transition="all 0.2s ease-in-out"
                >
                    Edit
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
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter group name"
                            />
                        </FormControl>

                        <FormControl id="image" mb={4}>
                            <FormLabel>Image URL</FormLabel>
                            <Input
                                type="file"
                                name="image"
                                onChange={handleChange}
                                placeholder="Enter image URL"
                            />
                        </FormControl>

                        <FormControl id="limit" mb={4} isRequired>
                            <FormLabel>Limit</FormLabel>
                            <Input
                                name="limit"
                                type="number"
                                value={formData.limit}
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

export default EditModel;
