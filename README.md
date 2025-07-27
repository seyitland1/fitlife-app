# WhatsCRM QR Add-on

🚀 **WhatsApp QR Code Login Add-on for WhatsCRM**

A powerful, secure, and user-friendly add-on that enables seamless WhatsApp integration with your CRM system using QR code authentication. Built with modern web technologies for optimal performance and reliability.

![WhatsCRM QR Add-on](https://img.shields.io/badge/WhatsApp-Integration-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4.7.5-010101?style=for-the-badge&logo=socket.io&logoColor=white)

## ✨ Features

### 🔐 **Secure Authentication**
- QR code-based WhatsApp Web authentication
- Encrypted session management
- Automatic session recovery
- Multi-user support for teams

### 💬 **Real-time Communication**
- Live message synchronization
- WebSocket-powered real-time updates
- Message status tracking
- Contact management

### 🎯 **CRM Integration**
- Seamless contact synchronization
- Message history integration
- Customer interaction tracking
- API endpoints for external systems

### 🎨 **Modern UI/UX**
- Responsive design for all devices
- Intuitive QR code scanning interface
- Real-time status indicators
- Beautiful, accessible components

### 🛡️ **Security & Privacy**
- Local session storage
- No message data retention
- CORS protection
- Rate limiting
- Security headers

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │◄──►│   Node.js API   │◄──►│   WhatsApp Web  │
│                 │    │                 │    │                 │
│ • QR Display    │    │ • Session Mgmt  │    │ • Message Sync  │
│ • Chat UI       │    │ • WebSocket     │    │ • Contact Sync  │
│ • Status Track  │    │ • API Routes    │    │ • Auth Handler  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Chrome/Chromium** browser (for WhatsApp Web)
- **Git** for cloning the repository

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/whatscrm-qr-addon.git
   cd whatscrm-qr-addon
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   npm install
   
   # Install client dependencies
   cd client
   npm install
   cd ..
   ```

3. **Environment setup**
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Edit configuration (optional)
   nano .env
   ```

4. **Start the application**
   ```bash
   # Development mode (runs both server and client)
   npm run dev
   
   # Or start separately
   npm run server  # Backend on port 5000
   npm run client  # Frontend on port 3000
   ```

5. **Access the application**
   - Open your browser and navigate to `http://localhost:3000`
   - Click "Connect WhatsApp" to generate a QR code
   - Scan the QR code with your WhatsApp mobile app
   - Start managing your WhatsApp conversations!

## 📱 Usage Guide

### Initial Setup

1. **Launch the Application**
   - Open `http://localhost:3000` in your browser
   - You'll see the QR login interface

2. **Connect WhatsApp**
   - Click "Connect WhatsApp" button
   - A QR code will appear on screen
   - Open WhatsApp on your phone
   - Go to Settings → Linked Devices → Link a Device
   - Scan the QR code displayed on your screen

3. **Start Messaging**
   - Once connected, you'll be redirected to the dashboard
   - Select contacts from the left sidebar
   - Send and receive messages in real-time
   - Monitor connection status in the header

### Dashboard Features

#### 📋 **Contact Management**
- View all WhatsApp contacts
- Search and filter contacts
- See last message and timestamp
- Unread message indicators

#### 💬 **Messaging Interface**
- Real-time message synchronization
- Send text messages
- Message status indicators
- Chat history preservation

#### 📊 **Status Monitoring**
- Connection status indicator
- Session health monitoring
- Error notifications
- Automatic reconnection

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|----------|
| `PORT` | Server port | `5000` |
| `CLIENT_URL` | Frontend URL | `http://localhost:3000` |
| `NODE_ENV` | Environment | `development` |
| `JWT_SECRET` | JWT signing key | `change-this-secret` |
| `RATE_LIMIT_MAX_REQUESTS` | Rate limit | `100` |

### Advanced Configuration

```javascript
// server/config.js
module.exports = {
  whatsapp: {
    sessionPath: './sessions',
    timeout: 60000,
    retries: 3
  },
  security: {
    corsOrigin: process.env.CORS_ORIGIN,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 100
    }
  }
};
```

## 🔌 API Reference

### WebSocket Events

#### Client → Server
```javascript
// Initialize WhatsApp connection
socket.emit('initWhatsApp', {
  userId: 'user123',
  sessionId: 'session456'
});

// Send message
socket.emit('sendMessage', {
  userId: 'user123',
  sessionId: 'session456',
  to: '1234567890@c.us',
  message: 'Hello World!'
});

// Logout
socket.emit('logout', {
  userId: 'user123',
  sessionId: 'session456'
});
```

#### Server → Client
```javascript
// QR Code generated
socket.on('qrCode', (data) => {
  console.log('QR Code:', data.qrCode);
});

// Authentication successful
socket.on('authenticated', (data) => {
  console.log('Authenticated:', data);
});

// WhatsApp ready
socket.on('ready', (data) => {
  console.log('Ready:', data.user, data.name);
});

// New message received
socket.on('newMessage', (message) => {
  console.log('New message:', message);
});
```

### REST API Endpoints

```http
# Health check
GET /api/health

# Get active sessions
GET /api/sessions

# Session management
POST /api/sessions
DELETE /api/sessions/:sessionId
```

## 🛠️ Development

### Project Structure

```
whatscrm-qr-addon/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # React context
│   │   └── App.js         # Main app component
│   └── package.json
├── server/                # Node.js backend
│   ├── index.js          # Main server file
│   ├── config/           # Configuration files
│   ├── middleware/       # Express middleware
│   └── utils/            # Utility functions
├── .env.example          # Environment template
├── package.json          # Server dependencies
└── README.md
```

### Development Commands

```bash
# Install all dependencies
npm run install-all

# Start development servers
npm run dev

# Start only backend
npm run server

# Start only frontend
npm run client

# Build for production
npm run build

# Run tests
npm test
```

### Adding New Features

1. **Backend Features**
   ```javascript
   // server/routes/newFeature.js
   const express = require('express');
   const router = express.Router();
   
   router.get('/new-endpoint', (req, res) => {
     res.json({ message: 'New feature' });
   });
   
   module.exports = router;
   ```

2. **Frontend Components**
   ```jsx
   // client/src/components/NewComponent.js
   import React from 'react';
   
   const NewComponent = () => {
     return (
       <div className="new-component">
         <h2>New Feature</h2>
       </div>
     );
   };
   
   export default NewComponent;
   ```

## 🚀 Deployment

### Production Build

```bash
# Build the client
cd client
npm run build
cd ..

# Start production server
NODE_ENV=production npm start
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN cd client && npm ci && npm run build

EXPOSE 5000
CMD ["npm", "start"]
```

```bash
# Build and run
docker build -t whatscrm-qr-addon .
docker run -p 5000:5000 whatscrm-qr-addon
```

### Environment Setup

```bash
# Production environment variables
export NODE_ENV=production
export PORT=5000
export CLIENT_URL=https://your-domain.com
export JWT_SECRET=your-production-secret
```

## 🔒 Security Considerations

### Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use strong, unique secrets
   - Rotate keys regularly

2. **Network Security**
   - Use HTTPS in production
   - Configure proper CORS
   - Implement rate limiting

3. **Session Management**
   - Sessions are stored locally
   - No message data is retained
   - Automatic cleanup on logout

### Security Headers

```javascript
// Implemented security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"]
    }
  }
}));
```

## 🐛 Troubleshooting

### Common Issues

#### QR Code Not Appearing
```bash
# Check server logs
npm run server

# Verify WhatsApp Web access
# Ensure Chrome/Chromium is installed
# Check firewall settings
```

#### Connection Timeouts
```bash
# Increase timeout in .env
WHATSAPP_TIMEOUT=120000

# Check network connectivity
# Verify WhatsApp Web is accessible
```

#### Authentication Failures
```bash
# Clear session data
rm -rf sessions/

# Restart the application
npm run dev

# Try with a fresh QR code
```

### Debug Mode

```bash
# Enable verbose logging
DEBUG=whatscrm:* npm run dev

# Check browser console
# Monitor network requests
# Review server logs
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Style

- Use ESLint and Prettier
- Follow React best practices
- Write meaningful commit messages
- Add JSDoc comments for functions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) - WhatsApp Web API
- [React](https://reactjs.org/) - Frontend framework
- [Socket.IO](https://socket.io/) - Real-time communication
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework

## 📞 Support

- 📧 Email: support@whatscrm.com
- 💬 Discord: [Join our community](https://discord.gg/whatscrm)
- 📖 Documentation: [docs.whatscrm.com](https://docs.whatscrm.com)
- 🐛 Issues: [GitHub Issues](https://github.com/your-org/whatscrm-qr-addon/issues)

---

**Made with ❤️ by the WhatsCRM Team**

*Streamline your customer communication with secure WhatsApp integration.*