import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { toast } from 'react-toastify';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [whatsappStatus, setWhatsappStatus] = useState('disconnected');
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(process.env.REACT_APP_SERVER_URL || 'http://localhost:5000', {
      transports: ['websocket', 'polling']
    });

    // Connection events
    newSocket.on('connect', () => {
      console.log('Connected to server with socket ID:', newSocket.id);
      setIsConnected(true);
      setSocket(newSocket);
    });

    newSocket.on('disconnect', (reason) => {
      console.log('Disconnected from server. Reason:', reason);
      setIsConnected(false);
      setWhatsappStatus('disconnected');
      setQrCode(null);
    });

    // WhatsApp events
    newSocket.on('qrCode', (data) => {
      console.log('QR Code received:', data);
      console.log('QR Code data URL length:', data.qrCode ? data.qrCode.length : 'null');
      setQrCode(data.qrCode);
      setWhatsappStatus('qr_ready');
    });

    newSocket.on('authenticated', (data) => {
      console.log('WhatsApp authenticated:', data);
      setWhatsappStatus('authenticated');
      setQrCode(null);
    });

    newSocket.on('ready', (data) => {
      console.log('WhatsApp ready:', data);
      setWhatsappStatus('ready');
      toast.success(`Connected as ${data.name} (${data.user})`);
    });

    newSocket.on('authFailed', (data) => {
      console.error('Authentication failed:', data);
      setWhatsappStatus('auth_failed');
      setQrCode(null);
      toast.error('WhatsApp authentication failed');
    });

    newSocket.on('disconnected', (data) => {
      console.log('WhatsApp disconnected:', data);
      setWhatsappStatus('disconnected');
      setQrCode(null);
      toast.warning('WhatsApp disconnected');
    });

    // Message events
    newSocket.on('newMessage', (message) => {
      console.log('New message received:', message);
      setMessages(prev => [...prev, message]);
      
      // Show notification for new messages
      if (!message.fromMe) {
        toast.info(`New message from ${message.from}`);
      }
    });

    newSocket.on('messageSent', (message) => {
      console.log('Message sent:', message);
      setMessages(prev => [...prev, { ...message, fromMe: true }]);
      toast.success('Message sent successfully');
    });

    // Error handling
    newSocket.on('error', (error) => {
      console.error('Socket error:', error);
      toast.error(error.message || 'An error occurred');
    });

    newSocket.on('loggedOut', (data) => {
      console.log('Logged out:', data);
      setWhatsappStatus('disconnected');
      setQrCode(null);
      setMessages([]);
      setContacts([]);
      toast.info('Successfully logged out from WhatsApp');
    });

    // Real WhatsApp data events
    newSocket.on('contactsReceived', (data) => {
      console.log('Real contacts received:', data.contacts.length);
      setContacts(data.contacts);
      toast.success(`Loaded ${data.contacts.length} contacts from WhatsApp`);
    });

    newSocket.on('chatsReceived', (data) => {
      console.log('Real chats received:', data.chats.length);
      // Update contacts with real chat data
      setContacts(prev => {
        const chatMap = new Map(data.chats.map(chat => [chat.id, chat]));
        return prev.map(contact => {
          const chat = chatMap.get(contact.id);
          if (chat) {
            return {
              ...contact,
              lastMessage: chat.lastMessage?.body || '',
              timestamp: chat.timestamp,
              unreadCount: chat.unreadCount || 0
            };
          }
          return contact;
        });
      });
      toast.success(`Loaded ${data.chats.length} chats from WhatsApp`);
    });

    newSocket.on('chatMessagesReceived', (data) => {
      console.log(`Messages received for chat ${data.chatId}:`, data.messages.length);
      setMessages(data.messages);
      toast.success(`Loaded ${data.messages.length} messages`);
    });

    // Cleanup on unmount
    return () => {
      newSocket.close();
    };
  }, []);

  // Socket methods
  const initializeWhatsApp = (userId = 'default', sessionId = 'main') => {
    if (socket && isConnected) {
      console.log('Initializing WhatsApp...', { userId, sessionId });
      setWhatsappStatus('initializing');
      socket.emit('initializeWhatsApp', { userId, sessionId });
    } else {
      toast.error('Not connected to server');
    }
  };

  const sendMessage = (to, message) => {
    if (socket && isConnected && whatsappStatus === 'ready') {
      socket.emit('sendMessage', {
        userId: 'default',
        sessionId: 'main',
        to,
        message
      });
    } else {
      toast.error('WhatsApp not ready. Please connect first.');
    }
  };

  const logout = () => {
    if (socket && isConnected) {
      socket.emit('logout', {
        userId: 'default',
        sessionId: 'main'
      });
    }
  };

  const getContacts = () => {
    if (socket && isConnected && whatsappStatus === 'ready') {
      console.log('Requesting real contacts from WhatsApp...');
      socket.emit('getContacts');
    } else {
      toast.error('WhatsApp not ready. Please connect first.');
    }
  };

  const getChats = () => {
    if (socket && isConnected && whatsappStatus === 'ready') {
      console.log('Requesting real chats from WhatsApp...');
      socket.emit('getChats');
    } else {
      toast.error('WhatsApp not ready. Please connect first.');
    }
  };

  const getChatMessages = (chatId, limit = 50) => {
    if (socket && isConnected && whatsappStatus === 'ready') {
      console.log(`Requesting messages for chat: ${chatId}`);
      socket.emit('getChatMessages', { chatId, limit });
    } else {
      toast.error('WhatsApp not ready. Please connect first.');
    }
  };

  const getStatusColor = () => {
    switch (whatsappStatus) {
      case 'ready':
        return 'text-green-600';
      case 'authenticated':
      case 'qr_ready':
        return 'text-yellow-600';
      case 'initializing':
        return 'text-blue-600';
      case 'auth_failed':
      case 'disconnected':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusText = () => {
    switch (whatsappStatus) {
      case 'ready':
        return 'Connected';
      case 'authenticated':
        return 'Authenticated';
      case 'qr_ready':
        return 'Scan QR Code';
      case 'initializing':
        return 'Connecting...';
      case 'auth_failed':
        return 'Authentication Failed';
      case 'disconnected':
        return 'Disconnected';
      default:
        return 'Unknown';
    }
  };

  const value = {
    socket,
    isConnected,
    qrCode,
    whatsappStatus,
    messages,
    contacts,
    initializeWhatsApp,
    sendMessage,
    logout,
    getContacts,
    getChats,
    getChatMessages,
    getStatusColor,
    getStatusText
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};