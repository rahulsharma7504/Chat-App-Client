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
import Table from './components/Group/Table';
import JoinLink from './components/Group/JoinLink';
import { ChatProvider } from './Context/ChatUser';
import { GroupProvider } from './Context/GroupContext';
import { TabProvider } from './Context/TabsContext';

const App = () => {
  return (
    <Router>
      <ToastContainer
        position="top-center"  // Center the toast notifications at the top
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <AuthProvider>
        <GroupProvider>
          <ChatProvider>
            <TabProvider>
            <Layout>
              <AppContent />
            </Layout>
            </TabProvider>
          </ChatProvider>
        </GroupProvider>
      </AuthProvider>
    </Router>
  );
};

const AppContent = () => {
  const { user } = useAuth();

  // Check if user is authenticated, otherwise redirect to login
  const isAuthenticated = user && user.isAuthenticated;

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={isAuthenticated ? <Tabspanel /> : <Navigate to="/login" />} />
      <Route path="/forget" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
      <Route path="/groups" element={isAuthenticated ? <Table /> : <Navigate to="/login" />} />
      <Route path="/groups/:id" element={isAuthenticated ? <JoinLink /> : <Navigate to="/login" />} />

      {/* Redirect all other routes */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
    </Routes>
  );
};

export default App;
