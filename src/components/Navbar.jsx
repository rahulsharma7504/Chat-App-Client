import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../Styles/Navbar.css'
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

const Navbar = ({ toggleDrawer }) => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUserData(user);
    }, [navigate]);

    const register = () => {
        navigate('/register')

    }
    const login = () => {
        navigate('/login')
    }

    const logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.success('Logged out successfully!');
        navigate('/login');
    };



    return (
        <nav className="navbar">
            {/* <div className="navbar-container"> */}
            {/* Logo or Brand */}
            <div className="navbar-brand">
                {/* Clicking the brand name triggers the openDrawer function */}
                <a style={{ cursor: 'pointer' }} className="navbar-logo" onClick={toggleDrawer}>
                    Chatting System
                </a>
            </div>

            {/* Mobile Hamburger Icon */}
            <div className="navbar-toggle">
                <i className="fas fa-bars"></i>
            </div>

            {/* Navbar Links */}
            <div className="navbar-links">
                {
                    userData && (
                        <>
                            <NavLink to='/dashboard' className="navbar-link">
                                <i className="fa fa-home" style={{ color: 'white' }}></i> Dashboard
                            </NavLink>

                            {/* Groups Link */}
                            <NavLink to='/groups' className="navbar-link">
                                <i className='fa fa-group'></i> Groups
                            </NavLink>
                        </>
                    )
                }
                {/* Dashboard Link */}


                {/* Conditional Links based on user authentication */}
                {!userData ? (
                    <>
                        <a style={{ color: 'white', cursor: 'pointer' }} onClick={register}>
                            <i className="fas fa-user"></i> Register
                        </a>
                        <a onClick={login} style={{ color: 'white', cursor: 'pointer' }}>
                            <i className="fas fa-user-circle"></i> Login
                        </a>
                    </>
                ) : (
                    <>
                        <a href="#" onClick={logOut} className="navbar-link">
                            <i className="fas fa-sign-out-alt"></i> Log Out
                        </a>

                        {/* User Image and Name */}
                        <div className="user-info">
                            <img src={userData.image} alt={userData.name} className="user-image" />
                        </div>
                    </>
                )}
            </div>
            {/* </div> */}
        </nav>
    );
};

export default Navbar;
