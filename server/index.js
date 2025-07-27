const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { Client, LocalAuth } = require('whatsapp-web.js');
const QRCode = require('qrcode');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  trustProxy: false, // Set to true if behind a proxy
  skip: (req) => req.ip === '127.0.0.1' || req.ip === '::1', // Skip localhost
});
app.use(limiter);

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

// Global WhatsApp client
let globalClient = null;
let isInitializing = false;
let connectedSockets = new Set();
const sessions = new Map();

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('initializeWhatsApp', async () => {
    try {
      console.log('WhatsApp initialization requested by socket:', socket.id);
      
      // Add socket to connected sockets
      connectedSockets.add(socket.id);
      
      // If client already exists and is ready, send status
      if (globalClient && globalClient.info) {
        console.log('Client already authenticated, sending status');
        socket.emit('authenticated', {
          user: globalClient.info.wid.user,
          name: globalClient.info.pushname
        });
        socket.emit('ready');
        return;
      }
      
      // If already initializing, just wait
      if (isInitializing) {
        console.log('Client already initializing, socket will receive events');
        return;
      }
      
      // Start initialization
      isInitializing = true;
      console.log('Creating new WhatsApp client');
      
      globalClient = new Client({
        authStrategy: new LocalAuth({ clientId: 'main' }),
        puppeteer: {
          headless: true,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu',
            '--disable-web-security',
            '--disable-features=VizDisplayCompositor'
          ],
          timeout: 60000
        }
      });

      // QR Code event
      globalClient.on('qr', async (qr) => {
        try {
          const qrCodeDataURL = await QRCode.toDataURL(qr, {
            width: 256,
            margin: 2,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            }
          });
          console.log('QR Code generated');
          console.log('Broadcasting QR code to all connected sockets');
          console.log('QR code data URL length:', qrCodeDataURL.length);
          
          // Broadcast to all connected sockets
          connectedSockets.forEach(socketId => {
            const targetSocket = io.sockets.sockets.get(socketId);
            if (targetSocket) {
              targetSocket.emit('qrCode', { qrCode: qrCodeDataURL });
            }
          });
          console.log('QR code broadcasted successfully');
        } catch (error) {
          console.error('QR Code generation error:', error);
          connectedSockets.forEach(socketId => {
            const targetSocket = io.sockets.sockets.get(socketId);
            if (targetSocket) {
              targetSocket.emit('error', { message: 'Failed to generate QR code' });
            }
          });
        }
      });

      // Authentication events
      globalClient.on('authenticated', () => {
        console.log('Client authenticated');
        connectedSockets.forEach(socketId => {
          const targetSocket = io.sockets.sockets.get(socketId);
          if (targetSocket) {
            targetSocket.emit('authenticated', { message: 'WhatsApp authenticated successfully' });
          }
        });
      });

      globalClient.on('auth_failure', (msg) => {
        console.error('Authentication failed:', msg);
        connectedSockets.forEach(socketId => {
          const targetSocket = io.sockets.sockets.get(socketId);
          if (targetSocket) {
            targetSocket.emit('authFailed', { message: 'Authentication failed' });
          }
        });
        globalClient = null;
        isInitializing = false;
      });

      // Ready event
      globalClient.on('ready', () => {
        console.log('Client ready');
        const clientInfo = globalClient.info;
        connectedSockets.forEach(socketId => {
          const targetSocket = io.sockets.sockets.get(socketId);
          if (targetSocket) {
            targetSocket.emit('ready', {
              user: clientInfo.wid.user,
              name: clientInfo.pushname,
              platform: clientInfo.platform
            });
          }
        });
        isInitializing = false;
      });

      // Disconnection events
      globalClient.on('disconnected', (reason) => {
        console.log('Client disconnected:', reason);
        connectedSockets.forEach(socketId => {
          const targetSocket = io.sockets.sockets.get(socketId);
          if (targetSocket) {
            targetSocket.emit('disconnected', { reason });
          }
        });
        globalClient = null;
        isInitializing = false;
      });

      // Message events
      globalClient.on('message', async (message) => {
        console.log('New message received:', message.from, message.body);
        connectedSockets.forEach(socketId => {
          const targetSocket = io.sockets.sockets.get(socketId);
          if (targetSocket) {
            targetSocket.emit('newMessage', {
              id: message.id._serialized,
              body: message.body,
              from: message.from,
              to: message.to,
              timestamp: message.timestamp,
              type: message.type,
              isGroupMsg: message.isGroupMsg
            });
          }
        });
      });

      await globalClient.initialize();
      console.log('WhatsApp client initialized successfully');

    } catch (error) {
      console.error('WhatsApp initialization error:', error);
      connectedSockets.forEach(socketId => {
        const targetSocket = io.sockets.sockets.get(socketId);
        if (targetSocket) {
          targetSocket.emit('error', { message: 'Failed to initialize WhatsApp client' });
        }
      });
      globalClient = null;
      isInitializing = false;
    }
  });

  // Send message
  socket.on('sendMessage', async (data) => {
    try {
      const { phoneNumber, message } = data;
      
      if (!globalClient) {
        socket.emit('error', { message: 'WhatsApp client not found. Please initialize first.' });
        return;
      }

      // Check if client is ready
      if (!globalClient.info) {
        socket.emit('error', { message: 'WhatsApp client is not ready. Please wait for authentication.' });
        return;
      }

      // Format phone number
      let formattedNumber = phoneNumber.replace(/\D/g, '');
      if (!formattedNumber.includes('@c.us')) {
        formattedNumber = formattedNumber + '@c.us';
      }

      // Send message
      const sentMessage = await globalClient.sendMessage(formattedNumber, message);
      
      socket.emit('messageSent', {
        id: sentMessage.id._serialized,
        to: formattedNumber,
        body: message,
        timestamp: sentMessage.timestamp
      });

      console.log(`Message sent to ${formattedNumber}: ${message}`);

    } catch (error) {
      console.error('Send message error:', error);
      socket.emit('error', { 
        message: 'Failed to send message', 
        error: error.message 
      });
    }
  });

  // Get contacts
  socket.on('getContacts', async () => {
    try {
      if (!globalClient || !globalClient.info) {
        socket.emit('error', { message: 'WhatsApp client not ready' });
        return;
      }

      console.log('Fetching contacts...');
      const contacts = await globalClient.getContacts();
      
      // Filter and format contacts
      const formattedContacts = contacts
        .filter(contact => contact.isMyContact && !contact.isGroup)
        .map(contact => ({
          id: contact.id._serialized,
          name: contact.name || contact.pushname || contact.number,
          number: contact.number,
          profilePicUrl: contact.profilePicUrl,
          isMyContact: contact.isMyContact,
          isUser: contact.isUser,
          lastSeen: contact.lastSeen
        }))
        .slice(0, 50); // Limit to first 50 contacts

      console.log(`Found ${formattedContacts.length} contacts`);
      socket.emit('contactsReceived', { contacts: formattedContacts });

    } catch (error) {
      console.error('Get contacts error:', error);
      socket.emit('error', { message: 'Failed to get contacts', error: error.message });
    }
  });

  // Get chats
  socket.on('getChats', async () => {
    try {
      if (!globalClient || !globalClient.info) {
        socket.emit('error', { message: 'WhatsApp client not ready' });
        return;
      }

      console.log('Fetching chats...');
      const chats = await globalClient.getChats();
      
      // Format chats
      const formattedChats = chats
        .filter(chat => !chat.isGroup) // Only individual chats
        .map(chat => ({
          id: chat.id._serialized,
          name: chat.name,
          lastMessage: chat.lastMessage ? {
            body: chat.lastMessage.body,
            timestamp: chat.lastMessage.timestamp,
            fromMe: chat.lastMessage.fromMe
          } : null,
          unreadCount: chat.unreadCount,
          timestamp: chat.timestamp
        }))
        .slice(0, 30); // Limit to first 30 chats

      console.log(`Found ${formattedChats.length} chats`);
      socket.emit('chatsReceived', { chats: formattedChats });

    } catch (error) {
      console.error('Get chats error:', error);
      socket.emit('error', { message: 'Failed to get chats', error: error.message });
    }
  });

  // Get messages for a specific chat
  socket.on('getChatMessages', async (data) => {
    try {
      const { chatId, limit = 50 } = data;
      
      if (!globalClient || !globalClient.info) {
        socket.emit('error', { message: 'WhatsApp client not ready' });
        return;
      }

      console.log(`Fetching messages for chat: ${chatId}`);
      const chat = await globalClient.getChatById(chatId);
      const messages = await chat.fetchMessages({ limit });
      
      // Format messages
      const formattedMessages = messages.map(message => ({
        id: message.id._serialized,
        body: message.body,
        from: message.from,
        to: message.to,
        timestamp: message.timestamp,
        fromMe: message.fromMe,
        type: message.type,
        hasMedia: message.hasMedia
      }));

      console.log(`Found ${formattedMessages.length} messages for chat ${chatId}`);
      socket.emit('chatMessagesReceived', { 
        chatId, 
        messages: formattedMessages 
      });

    } catch (error) {
      console.error('Get chat messages error:', error);
      socket.emit('error', { message: 'Failed to get chat messages', error: error.message });
    }
  });

  // Logout
  socket.on('logout', async () => {
    try {
      if (globalClient) {
        await globalClient.logout();
        await globalClient.destroy();
        globalClient = null;
        isInitializing = false;
        
        // Notify all connected sockets
        connectedSockets.forEach(socketId => {
          const targetSocket = io.sockets.sockets.get(socketId);
          if (targetSocket) {
            targetSocket.emit('loggedOut', { message: 'Successfully logged out' });
          }
        });
        console.log('Client logged out successfully');
      } else {
        socket.emit('error', { message: 'No active session found' });
      }
    } catch (error) {
      console.error('Logout error:', error);
      socket.emit('error', { message: 'Failed to logout' });
    }
  });

  socket.on('disconnect', (reason) => {
    console.log('Client disconnected:', socket.id, 'Reason:', reason);
    connectedSockets.delete(socket.id);
  });
});

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/sessions', (req, res) => {
  const sessionList = Array.from(sessions.entries()).map(([key, session]) => ({
    sessionKey: key,
    ...session
  }));
  res.json({ sessions: sessionList });
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 WhatsCRM QR Add-on server running on port ${PORT}`);
  console.log(`📱 WebSocket server ready for connections`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  
  // Close all WhatsApp clients
  for (const [key, client] of clients.entries()) {
    try {
      await client.destroy();
      console.log(`✅ Closed WhatsApp client: ${key}`);
    } catch (error) {
      console.error(`❌ Error closing client ${key}:`, error);
    }
  }
  
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});