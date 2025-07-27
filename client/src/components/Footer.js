import React from 'react';
import { Heart, Github, Globe, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-green-500 p-2 rounded-lg">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">WhatsCRM QR Add-on</h3>
                <p className="text-sm text-gray-600">WhatsApp Integration Solution</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Seamlessly connect your WhatsApp account with your CRM system using our secure QR code authentication. 
              Manage conversations, sync contacts, and streamline your customer communication workflow.
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-green-500 transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-green-500 transition-colors"
                aria-label="Website"
              >
                <Globe className="w-5 h-5" />
              </a>
              <a 
                href="mailto:support@whatscrm.com" 
                className="text-gray-400 hover:text-green-500 transition-colors"
                aria-label="Email Support"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Features
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-green-600 transition-colors">
                  QR Code Authentication
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600 transition-colors">
                  Real-time Messaging
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600 transition-colors">
                  Contact Synchronization
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600 transition-colors">
                  CRM Integration
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600 transition-colors">
                  Multi-device Support
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-green-600 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600 transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600 transition-colors">
                  Troubleshooting
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600 transition-colors">
                  Contact Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600 transition-colors">
                  Community Forum
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-blue-900 mb-1">
                  Security & Privacy
                </h4>
                <p className="text-sm text-blue-800">
                  Your WhatsApp sessions are encrypted and stored locally. We never access your messages or personal data. 
                  This add-on complies with WhatsApp's Terms of Service and uses official APIs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-1 text-sm text-gray-600 mb-4 md:mb-0">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>for better customer communication</span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <span>© {currentYear} WhatsCRM. All rights reserved.</span>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-green-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-green-600 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Version Info */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Version 1.0.0 | Built with React & Node.js | Powered by whatsapp-web.js
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;