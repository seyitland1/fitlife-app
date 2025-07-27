import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../context/SocketContext';
import { 
  Send, 
  MessageCircle, 
  Users, 
  Phone, 
  Search, 
  Filter,
  Download,
  Upload,
  Settings,
  MoreVertical
} from 'lucide-react';
import { toast } from 'react-toastify';

const Dashboard = ({ user }) => {
  const { 
    messages, 
    sendMessage, 
    whatsappStatus, 
    getStatusColor, 
    getStatusText,
    contacts: realContacts,
    getContacts,
    getChats,
    getChatMessages
  } = useSocket();
  
  const [activeChat, setActiveChat] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const messagesEndRef = useRef(null);

  // Load real WhatsApp contacts when ready
  useEffect(() => {
    if (whatsappStatus === 'ready') {
      console.log('WhatsApp is ready, loading real contacts and chats...');
      getContacts();
      getChats();
    }
  }, [whatsappStatus, getContacts, getChats]);

  // Update local contacts when real contacts are received
  useEffect(() => {
    if (realContacts && realContacts.length > 0) {
      console.log('Updating contacts with real WhatsApp data:', realContacts.length);
      setContacts(realContacts);
      setFilteredContacts(realContacts);
    } else {
      // Fallback to sample contacts if no real contacts
      const sampleContacts = [
        {
          id: '1234567890@c.us',
          name: 'John Doe',
          lastMessage: 'Hello, how are you?',
          timestamp: new Date().toISOString(),
          unreadCount: 2,
          avatar: null
        },
        {
          id: '0987654321@c.us',
          name: 'Jane Smith',
          lastMessage: 'Thanks for the information',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          unreadCount: 0,
          avatar: null
        },
        {
          id: '1122334455@c.us',
          name: 'Mike Johnson',
          lastMessage: 'Can we schedule a meeting?',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          unreadCount: 1,
          avatar: null
        }
      ];
      setContacts(sampleContacts);
      setFilteredContacts(sampleContacts);
    }
  }, [realContacts]);

  // Filter contacts based on search
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.id.includes(searchTerm)
      );
      setFilteredContacts(filtered);
    }
  }, [searchTerm, contacts]);

  // Auto scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim() || !activeChat) {
      toast.warning('Please select a contact and enter a message');
      return;
    }

    if (whatsappStatus !== 'ready') {
      toast.error('WhatsApp is not connected');
      return;
    }

    sendMessage(activeChat.id, messageText.trim());
    setMessageText('');
  };

  const handleVoiceCall = (contactId) => {
    // WhatsApp Web doesn't support voice calls directly
    // This will open WhatsApp Web with the contact for manual calling
    const whatsappUrl = `https://web.whatsapp.com/send?phone=${contactId.replace('@c.us', '')}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleContactSelect = (contact) => {
    setActiveChat(contact);
    // Load messages for this contact
    if (whatsappStatus === 'ready') {
      getChatMessages(contact.id, 50);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const getContactMessages = (contactId) => {
    return messages.filter(msg => 
      msg.from === contactId || msg.to === contactId
    ).sort((a, b) => a.timestamp - b.timestamp);
  };

  const renderContactList = () => {
    return (
      <div className="bg-white border-r border-gray-200 w-80 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Contacts</h2>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                <Filter className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => {
            const contactMessages = getContactMessages(contact.id);
            const lastMessage = contactMessages[contactMessages.length - 1];
            
            return (
              <div
                key={contact.id}
                onClick={() => handleContactSelect(contact)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  activeChat?.id === contact.id ? 'bg-green-50 border-green-200' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-gray-600" />
                  </div>
                  
                  {/* Contact Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {contact.name}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {lastMessage ? formatTime(lastMessage.timestamp * 1000) : formatTime(contact.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {lastMessage ? lastMessage.body : contact.lastMessage}
                    </p>
                  </div>
                  
                  {/* Unread Badge */}
                  {contact.unreadCount > 0 && (
                    <div className="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {contact.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderChatArea = () => {
    if (!activeChat) {
      return (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
            <p className="text-gray-500">Choose a contact from the list to start messaging</p>
          </div>
        </div>
      );
    }

    const contactMessages = getContactMessages(activeChat.id);

    return (
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{activeChat.name}</h3>
                <p className="text-sm text-gray-500">{activeChat.id}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => handleVoiceCall(activeChat.id)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                title="Start voice call"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {contactMessages.map((message, index) => {
            const isFromMe = message.fromMe || message.to === activeChat.id;
            const showDate = index === 0 || 
              formatDate(contactMessages[index - 1].timestamp * 1000) !== formatDate(message.timestamp * 1000);
            
            return (
              <div key={message.id || index}>
                {showDate && (
                  <div className="text-center mb-4">
                    <span className="bg-white px-3 py-1 rounded-full text-xs text-gray-500 border">
                      {formatDate(message.timestamp * 1000)}
                    </span>
                  </div>
                )}
                
                <div className={`flex ${isFromMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    isFromMe 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white text-gray-900 border border-gray-200'
                  }`}>
                    <p className="text-sm">{message.body}</p>
                    <p className={`text-xs mt-1 ${
                      isFromMe ? 'text-green-100' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp * 1000)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            >
              <Upload className="w-4 h-4" />
            </button>
            
            <div className="flex-1">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type a message..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
                disabled={whatsappStatus !== 'ready'}
              />
            </div>
            
            <button
              type="submit"
              disabled={!messageText.trim() || whatsappStatus !== 'ready'}
              className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Status Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">WhatsApp Dashboard</h1>
            <div className={`flex items-center space-x-2 ${getStatusColor()}`}>
              <div className="w-2 h-2 rounded-full bg-current"></div>
              <span className="text-sm font-medium">{getStatusText()}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">
              {messages.length} messages
            </span>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {renderContactList()}
        {renderChatArea()}
      </div>
    </div>
  );
};

export default Dashboard;