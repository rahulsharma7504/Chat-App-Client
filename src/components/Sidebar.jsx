import React from 'react'

const Sidebar = ({drawerOpen}) => {
    
  return (
    <>
     <div>
          {/* Sidebar Drawer */}
          <div id="myDrawer" className={`drawer ${drawerOpen ? 'open' : ''}`}>
           

            {/* Additional sidebar content can go here */}
            <h3>hello</h3>

          </div>

          {/* Main Content Shift with Sidebar */}
          <div className={`main-content ${drawerOpen ? 'shift' : ''}`}>
            {/* Main Content Here */}
          </div>
        </div>
      
    </>
  )
}

export default Sidebar
