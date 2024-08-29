import React, { useEffect, useState } from 'react';
import axios from 'axios';
import URL from '../Chunks/URL';
import Swal from 'sweetalert2';
import moment from 'moment/moment';
import Model from '../Chunks/Model'
import { Icon, Box, Toast } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import TableModel from './TableModel'
import EditModel from '../Chunks/EditModel'

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
import { toast } from 'react-toastify';

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

    const DeleteGroup = async (id) => {
        const res = await axios.delete(`${URL.Endpoint}/group/delete/${id}`);
        if (res.data.success) {
            toast.success(res.data.message);
            fetchGroups();
        } else {
            toast.error(res.data.message);
        }
    }

    const copylink=(id)=>{
        try {
            navigator.clipboard.writeText(`${window.location.href}/${id}`);
            toast.success("Link Copied Successfully");
            
        } catch (error) {
     
     
            toast.error(error.response.data.message);
            
        }
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
                                        <Button colorScheme="white" size="sm">
                                        <EditModel data={{ name: item.name, limit: item.limit,id:item._id }} update={fetchGroups} />

                                        </Button>
                                        <Button onClick={()=>DeleteGroup(item._id)} colorScheme="red" size="sm">
                                            Delete
                                        </Button>
                                        <Button onClick={()=>copylink(item._id)} colorScheme="blue" style={{margin:'0px 4px'}} size="sm">
                                            <i className='fa fa-copy' size='lg'></i>
                                            Copy
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


