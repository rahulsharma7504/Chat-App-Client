import React, { useState } from 'react';
import Footer from './Pages/Footer';
import '../Styles/header.css';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen((prevOpen) => !prevOpen);
  };

  return (
    <>
      {/* Pass toggleDrawer function to Navbar component */}

      <header style={{marginBottom:'35px'}}>
      <Navbar toggleDrawer={toggleDrawer} />

       <Sidebar drawerOpen={drawerOpen}/>
      </header>

      <main >{children}</main>

      <footer>
        {/* Footer component */}
        {/* <Footer /> */}
      </footer>
    </>
  );
};

export default Layout;
