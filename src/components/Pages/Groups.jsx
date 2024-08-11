import React, { useEffect, useState } from 'react'
import { Button, Icon, Box, useStatStyles } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import Model from '../Chunks/Model'
import axios from 'axios';
import Swal from "sweetalert2";
import URL from '../Chunks/URL';
const Groups = ({update}) => {
const [groups,setGroups]=useState([]);

useEffect(()=>{
    fetchGroups();
},[]);

useEffect(() => {
    // Re-fetch groups whenever 'update' changes
    fetchGroups();
}, [update]);

const fetchGroups = async ()=>{
    const id=JSON.parse(localStorage.getItem('user'))._id;
    const response = await axios.get(`${URL.Endpoint}/group/getUsers/${id}`);
    setGroups(response.data);
    console.log(response.data)
}

    
    return (
        <>
        
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <Model />

                    </div>
                </div>

            </div>





        </>
    )
}

export default Groups
