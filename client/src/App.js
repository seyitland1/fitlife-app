import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import QRLogin from './components/QRLogin';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import Header from './components/Header';
import Footer from './components/Footer';
import { SocketProvider } from './context/SocketContext';

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('whatsapp_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('whatsapp_user');
      }
    }
  }, []);

  const handleAuthentication = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('whatsapp_user', JSON.stringify(userData));
    toast.success('Successfully connected to WhatsApp!');
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('whatsapp_user');
    toast.info('Logged out from WhatsApp');
  };

  return (
    <SocketProvider>
      <Router>
        <div className="App min-h-screen bg-gray-50">
          <Header user={user} isAuthenticated={isAuthenticated} onLogout={handleLogout} />
          
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route 
                path="/" 
                element={
                  isAuthenticated ? (
                    <Dashboard user={user} />
                  ) : (
                    <QRLogin onAuthentication={handleAuthentication} />
                  )
                } 
              />
              <Route 
                path="/login" 
                element={<QRLogin onAuthentication={handleAuthentication} />} 
              />
              <Route 
                path="/dashboard" 
                element={
                  isAuthenticated ? (
                    <Dashboard user={user} />
                  ) : (
                    <QRLogin onAuthentication={handleAuthentication} />
                  )
                } 
              />
              <Route 
                path="/settings" 
                element={
                  isAuthenticated ? (
                    <Settings user={user} />
                  ) : (
                    <QRLogin onAuthentication={handleAuthentication} />
                  )
                } 
              />
            </Routes>
          </main>
          
          <Footer />
          
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </SocketProvider>
  );
}

export default App;