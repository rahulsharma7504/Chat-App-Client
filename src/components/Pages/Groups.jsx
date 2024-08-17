import React, { useEffect, useState } from 'react'
import { Button, Icon, Box, useStatStyles } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import Model from '../Chunks/Model'
import axios from 'axios';
import Swal from "sweetalert2";
import URL from '../Chunks/URL';
const Groups = () => {

    
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
