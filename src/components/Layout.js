import React, { useState } from 'react';
import Footer from './Pages/Footer';
import '../Styles/header.css';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen((prevOpen) => !prevOpen);
  };

  return (
    <>
      {/* Pass toggleDrawer function to Navbar component */}
      <Navbar toggleDrawer={toggleDrawer} />

      <header>
        <div>
          {/* Sidebar Drawer */}
          <div id="myDrawer" className={`drawer ${drawerOpen ? 'open' : ''}`}>
            <a
              href="#"
              style={{ fontSize: '25px' }}
              className="closebtn"
              onClick={toggleDrawer}
            >
              <i className="fa fa-times"></i> Close
            </a>
            {/* Additional sidebar content can go here */}
          </div>

          {/* Main Content Shift with Sidebar */}
          <div className={`main-content ${drawerOpen ? 'shift' : ''}`}>
            {/* Main Content Here */}
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer>
        {/* Footer component */}
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
