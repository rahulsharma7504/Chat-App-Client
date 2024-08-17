import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
// import styles from '../../Styles/register.module.css'
import styles from '../../Styles/register.module.css'
import { useNavigate, Link } from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setData({ ...data, image: e.target.files[0] });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('password', data.password);
      if (data.image) formData.append('image', data.image);

      const response = await axios.post('http://localhost:4000/api/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success(response.data.message);
      toast.success('User registered successfully');
      navigate('/login');
      setData({
        name: '',
        email: '',
        password: '',
        image: '',
      });
      setErrors([]);  
    } catch (error) {
      if (error.response && error.response.data.errors) {
        toast.error(error.response.data.errors[0].msg);
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <>
      <div className={styles.registerContainer}>
        <div className={styles.registerForm}>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>Username</label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Image</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
          {errors.length > 0 && (
            <div className={styles.errors}>
              <h2>Errors:</h2>
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error.msg}</li>
                ))}
              </ul>
            </div>
          )}
          <div className={styles.additionalLinks}>
            <Link to="/login">Login</Link>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </div>
      </div>
    </>

  );
};

export default Register;
