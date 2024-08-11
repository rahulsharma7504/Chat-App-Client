import React, { useState, useEffect } from 'react';
import Footer from './Pages/Footer';
import '../Styles/header.css';

import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserData(user);
  }, [navigate]);

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully!');
    navigate('/login');
  };



  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };
const register=()=>{
  navigate('/register')

}
  const login= ()=>{
    navigate('/login')
  }
  return (
    <div>
      <header>
        <div>
          <div id="myDrawer" className={`drawer ${drawerOpen ? 'open' : ''}`}>
            <a href="javascript:void(0)" style={{fontSize:'25px'}} className="closebtn" onClick={closeDrawer}> <i  class="fa fa-times"></i> Close</a>
            <div className="user-info">
              {
                ! userData && (
                  <>
                   <a style={{color:"white", cursor:'pointer'}} onClick={register} >
                <i className="fas fa-user"></i> Register</a>

              <hr />
              <a  onClick={login} style={{color:"white", cursor:'pointer'}}>

                <i className="fas fa-user-circle"></i> Login</a>
                  </>
                ) 
              }
             
              {
                userData && (
                  <div>
                    <a href="#" onClick={logOut}> <i className="fas fa-sign-out-alt"></i> Log Out</a>
                  </div>
                )
              }
              <hr />
              {
                userData && (
                  <>

                    <img src={userData.image} alt={userData.name} className="user-image" />
                    <h4>{userData.name}</h4>
                    <hr />
                    <a style={{color:'white', cursor:'pointer'}}><i class="fa fa-home" style={{color:'white'}}></i> Dashboard</a>

                  </>
                )
              }

            </div>

          </div>
          <button className="openbtn" onClick={openDrawer}>&#9776; Chatting System</button>
          <div className={`main-content ${drawerOpen ? 'shift' : ''}`}>

          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer>
        {/* <Footer /> */}
      </footer>
    </div>
  );
};

export default Layout;
