import React, { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { QrCode, Smartphone, Wifi, RefreshCw, AlertCircle } from 'lucide-react';

const QRLogin = ({ onAuthentication }) => {
  const { 
    qrCode, 
    whatsappStatus, 
    initializeWhatsApp, 
    getStatusColor, 
    getStatusText,
    isConnected 
  } = useSocket();
  
  // Debug logs
  console.log('QRLogin render - qrCode:', qrCode ? 'exists' : 'null', 'status:', whatsappStatus);
  
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    console.log('QRLogin - isConnected:', isConnected, 'whatsappStatus:', whatsappStatus);
    // Auto-initialize WhatsApp when component mounts
    if (isConnected && whatsappStatus === 'disconnected') {
      handleInitialize();
    }
  }, [isConnected, whatsappStatus]);

  useEffect(() => {
    // Handle successful authentication
    if (whatsappStatus === 'ready') {
      onAuthentication({
        status: 'connected',
        timestamp: new Date().toISOString()
      });
    }
  }, [whatsappStatus, onAuthentication]);

  const handleInitialize = () => {
    setIsLoading(true);
    initializeWhatsApp('default', 'main');
    
    // Reset loading state after a timeout
    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    handleInitialize();
  };

  const renderQRCode = () => {
    if (!qrCode) return null;

    return (
      <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200">
        <div className="text-center mb-4">
          <QrCode className="w-8 h-8 mx-auto mb-2 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-800">Scan QR Code</h3>
          <p className="text-sm text-gray-600">Open WhatsApp on your phone and scan this code</p>
        </div>
        
        <div className="flex justify-center mb-4">
          <img 
            src={qrCode} 
            alt="WhatsApp QR Code" 
            className="w-64 h-64 border border-gray-300 rounded-lg"
          />
        </div>
        
        <div className="text-center">
          <button
            onClick={handleRetry}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh QR Code
          </button>
        </div>
      </div>
    );
  };

  const renderInstructions = () => {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start">
          <Smartphone className="w-6 h-6 text-blue-600 mt-1 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-3">How to connect:</h3>
            <ol className="list-decimal list-inside space-y-2 text-blue-800">
              <li>Open WhatsApp on your phone</li>
              <li>Tap Menu (⋮) or Settings</li>
              <li>Select "Linked Devices"</li>
              <li>Tap "Link a Device"</li>
              <li>Point your phone at the QR code above</li>
            </ol>
          </div>
        </div>
      </div>
    );
  };

  const renderStatus = () => {
    const statusColor = getStatusColor();
    const statusText = getStatusText();
    
    return (
      <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
        <div className="flex items-center">
          <div className={`flex-shrink-0 ${statusColor}`}>
            {whatsappStatus === 'ready' && <Wifi className="w-5 h-5" />}
            {whatsappStatus === 'initializing' && <RefreshCw className="w-5 h-5 animate-spin" />}
            {whatsappStatus === 'auth_failed' && <AlertCircle className="w-5 h-5" />}
            {whatsappStatus === 'disconnected' && <AlertCircle className="w-5 h-5" />}
            {whatsappStatus === 'qr_ready' && <QrCode className="w-5 h-5" />}
          </div>
          <div className="ml-3">
            <p className={`text-sm font-medium ${statusColor}`}>
              Status: {statusText}
            </p>
            {!isConnected && (
              <p className="text-xs text-red-600 mt-1">
                Not connected to server
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          WhatsApp QR Login
        </h1>
        <p className="text-lg text-gray-600">
          Connect your WhatsApp account to WhatsCRM
        </p>
      </div>

      {/* Status */}
      <div className="mb-6">
        {renderStatus()}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* QR Code Section */}
        <div className="space-y-4">
          {whatsappStatus === 'qr_ready' && qrCode ? (
            renderQRCode()
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-dashed border-gray-300">
              <div className="text-center">
                {isLoading || whatsappStatus === 'initializing' ? (
                  <>
                    <RefreshCw className="w-12 h-12 mx-auto mb-4 text-blue-600 animate-spin" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Initializing...</h3>
                    <p className="text-gray-600">Setting up WhatsApp connection</p>
                  </>
                ) : whatsappStatus === 'auth_failed' ? (
                  <>
                    <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-600" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Authentication Failed</h3>
                    <p className="text-gray-600 mb-4">Please try again</p>
                    <button
                      onClick={handleRetry}
                      className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Retry Connection
                    </button>
                  </>
                ) : (
                  <>
                    <QrCode className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Waiting for QR Code</h3>
                    <p className="text-gray-600 mb-4">Click below to start the connection process</p>
                    <button
                      onClick={handleInitialize}
                      disabled={!isConnected || isLoading}
                      className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Wifi className="w-4 h-4 mr-2" />
                      Connect WhatsApp
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Instructions Section */}
        <div className="space-y-4">
          {renderInstructions()}
          
          {/* Additional Info */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Features:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Real-time message synchronization
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                CRM integration capabilities
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Secure session management
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Multi-device support
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Retry Counter */}
      {retryCount > 0 && (
        <div className="mt-4 text-center text-sm text-gray-500">
          Connection attempts: {retryCount}
        </div>
      )}
    </div>
  );
};

export default QRLogin;