import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Checkbox,
    useDisclosure
} from "@chakra-ui/react";
import axios from "axios";
import URL from "../Chunks/URL";
import { toast } from "react-toastify";



const TableModel = ({ groupId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [userData, setUserData] = useState([]);
    const [users, setUsers] = useState([]);
    const ID = JSON.parse(localStorage.getItem('user'))._id;

    useEffect(() => {
        handleFetch();
    }, []);
    const handleFetch = async () => {
        const res = await axios.post(`${URL.Endpoint}/users`, { id: ID })
        if (res.data) {
            setUserData(res.data);
        }
    };

    const handleCheck = (e) => {
        const newUsers = [...users];
        if (e.target.checked) {
            newUsers.push(e.target.value);
        } else {
            newUsers.splice(newUsers.indexOf(e.target.value), 1);
        }
        setUsers(newUsers);
    }

    const handleSubmit = async () => {
        // Send selected users and groupId to the server
       const res= await axios.post(`${URL.Endpoint}/group/addUsers`, {
            groupId: groupId,
            users: users,
        });
        toast.success(res.data.message);

        onClose();
    };

    
    
    return (
        <>
            <Button
                colorScheme="teal"
                size="sm"
                onClick={onOpen}
            >
                Select Members
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Select Groups</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <TableContainer>
                            <Table variant="striped" >
                                <Thead>
                                    <Tr>
                                        <Th>Select</Th>
                                        <Th>Name</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {userData?.map((item, index) => {
                                        return <Tr key={index}>
                                            <Td>
                                                <input type="checkbox" onChange={handleCheck} value={item._id} />
                                            </Td>
                                            <Td>{item.name}</Td>
                                        </Tr>
                                    })}

                                </Tbody>
                            </Table>
                        </TableContainer>
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
};

export default TableModel;
