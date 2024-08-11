import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../../Context/context';
import styles from '../../Styles/login.module.css'
const Login = () => {
  const { user,setUser } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      toast.error('Please fill all fields');
      return; 
    }

    try {
      const response = await axios.post('http://localhost:4000/api/login', data);

      // Save tokens if necessary
      localStorage.setItem('token', response.data.accessToken);
      setUser((prevUser) => ({
        ...prevUser,
        data: response.data.user,
        // isAuthenticated: true
      }));
      
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('refreshToken', response.data.refreshToken);

      toast.success(response.data.message);
      navigate('/dashboard');
      setData({
        email: '',
        password: '',
      });
    } catch (error) {
      if (error.response) {
        // Server response with error status
        toast.error(error.response.data.message);
      } else {
        // Network error or other
        toast.error('An error occurred. Please try again.');
      }
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
    <div className={styles.loginContainer}>
      <h1>Login Page</h1>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="User-Mail"
          required
        />
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <NavLink to="/register">Register</NavLink>
        </p>
      </form>
    </div>
  </div>
  );
};

export default Login;
