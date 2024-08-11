import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Register from './components/Pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Pages/Login';
import { AuthProvider, useAuth } from './Context/context';
import Home from './components/Pages/Home';
import Tabspanel from './components/Pages/Tabs';
const App = () => {
  return (
    <Router>
      <ToastContainer />
      <AuthProvider>
        <Layout>
          <AppContent />
        </Layout>
      </AuthProvider>
    </Router>
  );
};

const AppContent = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/" element={<Tabspanel />} /> */}
      <Route path="/dashboard" element={user.isAuthenticated ? <Tabspanel /> : <Navigate to="/login" />} />
      <Route path="/forget" element={user.isAuthenticated ? <Home /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to={user.isAuthenticated ? "/dashboard" : "/login"} />} />
    </Routes>
  );
};

export default App;

