import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import { 
  MessageSquare, 
  LogOut, 
  Settings, 
  User, 
  Menu, 
  X,
  Wifi,
  WifiOff
} from 'lucide-react';

const Header = ({ user, isAuthenticated, onLogout }) => {
  const { logout, whatsappStatus, isConnected } = useSocket();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      onLogout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getConnectionStatus = () => {
    if (!isConnected) {
      return { icon: WifiOff, text: 'Disconnected', color: 'text-red-500' };
    }
    
    switch (whatsappStatus) {
      case 'ready':
        return { icon: Wifi, text: 'Connected', color: 'text-green-500' };
      case 'qr_ready':
        return { icon: Wifi, text: 'Scan QR', color: 'text-yellow-500' };
      case 'initializing':
        return { icon: Wifi, text: 'Connecting', color: 'text-blue-500' };
      default:
        return { icon: WifiOff, text: 'Offline', color: 'text-gray-500' };
    }
  };

  const connectionStatus = getConnectionStatus();
  const StatusIcon = connectionStatus.icon;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-green-500 p-2 rounded-lg">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">WhatsCRM</h1>
                <p className="text-xs text-gray-500">QR Login Add-on</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Connection Status */}
            <div className="flex items-center space-x-2">
              <StatusIcon className={`w-4 h-4 ${connectionStatus.color}`} />
              <span className={`text-sm font-medium ${connectionStatus.color}`}>
                {connectionStatus.text}
              </span>
            </div>

            {/* Navigation Links */}
            <nav className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/settings"
                    className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                  </Link>
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
              )}
            </nav>

            {/* User Menu */}
            {isAuthenticated && (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Connected
                  </span>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-green-600 p-2 rounded-md"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-3">
              {/* Connection Status */}
              <div className="flex items-center space-x-2 px-3">
                <StatusIcon className={`w-4 h-4 ${connectionStatus.color}`} />
                <span className={`text-sm font-medium ${connectionStatus.color}`}>
                  {connectionStatus.text}
                </span>
              </div>

              {/* Navigation Links */}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 text-gray-700 hover:text-green-600 text-sm font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-3 py-2 text-gray-700 hover:text-green-600 text-sm font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block px-3 py-2 text-gray-700 hover:text-green-600 text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;