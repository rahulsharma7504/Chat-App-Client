import { MotionConfigContext } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import Model from '../Chunks/Model';
import Table from './Table';

const Group = () => {
    
  return (
    <>
    <div className="container-fliud">
        {/* <div className="row">
            <div className="col-md-3">
                <Model />
            </div>
        </div> */}
        <div className="row">
            <Table/>
        </div>
    </div>
    </>
  )
}

export default Group
