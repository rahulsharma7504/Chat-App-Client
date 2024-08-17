import React, { useEffect, useState } from 'react';
import axios from 'axios';
import URL from '../Chunks/URL';
import Swal from 'sweetalert2';
import moment from 'moment/moment';
import Model from '../Chunks/Model'
import { Icon, Box } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import TableModel from './TableModel'

import {
    Button,
    Image,
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
    useDisclosure,
} from "@chakra-ui/react";

const MyTable = ({ update }) => {
    const [groupsData, setGroupsData] = useState([]);

    useEffect(() => {
        fetchGroups();
    }, []);

    useEffect(() => {
        // Re-fetch groups whenever 'update' changes
        fetchGroups();
    }, [update]);

    const fetchGroups = async () => {
        const id = JSON.parse(localStorage.getItem('user'))._id;
        const response = await axios.get(`${URL.Endpoint}/group/getUsers/${id}`);
        setGroupsData(response.data);
    }
    return (
        // Display a loading message while waiting for the data
        <>
            <Model update={fetchGroups}  />
            <TableContainer>
                <Table variant="striped" colorScheme="teal">
                    <Thead>
                        <Tr>
                            <Th>S.No</Th>
                            <Th>Name</Th>
                            <Th>Image</Th>
                            <Th>Limit</Th>
                            <Th>Time</Th>
                            <Th>Members</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {groupsData && groupsData.length > 0 ? (
                            groupsData.map((item, index) => (
                                <Tr key={item.id}>
                                    <Td>{index + 1}</Td>
                                    <Td>{item.name}</Td>
                                    <Td>
                                        <Image src={item.image} alt={item.name} boxSize="50px" />
                                    </Td>
                                    <Td>{item.limit}</Td>
                                    <Td>{moment(item.createdAt).format('DD-MM-YYYY')}</Td>
                                    <Td>
                                        <TableModel groupsData={groupsData} groupId={item._id} />
                                    </Td>
                                    <Td>
                                        <Button colorScheme="blue" size="sm" mr={2}>
                                            Edit
                                        </Button>
                                        <Button colorScheme="red" size="sm">
                                            Delete
                                        </Button>
                                    </Td>
                                </Tr>
                            ))
                        ) : (
                            <Tr>
                                <Td colSpan={7} textAlign="center">
                                    No groups found.
                                </Td>
                            </Tr>
                        )}
                    </Tbody>

                </Table>
            </TableContainer>
        </>
    );
};

export default MyTable;


