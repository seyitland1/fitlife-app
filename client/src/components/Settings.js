import React, { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import { 
  Settings as SettingsIcon, 
  Save, 
  RefreshCw, 
  Bell, 
  Shield, 
  Database,
  Wifi,
  MessageSquare,
  User,
  Globe,
  Download,
  Upload,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'react-toastify';

const Settings = () => {
  const { whatsappStatus, logout, isConnected } = useSocket();
  const [settings, setSettings] = useState({
    notifications: {
      newMessages: true,
      connectionStatus: true,
      soundEnabled: false
    },
    privacy: {
      saveMessages: false,
      autoDownloadMedia: false,
      readReceipts: true
    },
    connection: {
      autoReconnect: true,
      sessionTimeout: 30,
      maxRetries: 3
    },
    ui: {
      theme: 'light',
      language: 'en',
      compactMode: false
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('whatscrm_settings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  const handleSaveSettings = () => {
    setIsLoading(true);
    try {
      localStorage.setItem('whatscrm_settings', JSON.stringify(settings));
      toast.success('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      const defaultSettings = {
        notifications: {
          newMessages: true,
          connectionStatus: true,
          soundEnabled: false
        },
        privacy: {
          saveMessages: false,
          autoDownloadMedia: false,
          readReceipts: true
        },
        connection: {
          autoReconnect: true,
          sessionTimeout: 30,
          maxRetries: 3
        },
        ui: {
          theme: 'light',
          language: 'en',
          compactMode: false
        }
      };
      setSettings(defaultSettings);
      toast.info('Settings reset to default');
    }
  };

  const handleClearData = () => {
    if (window.confirm('This will clear all local data including messages and session. Are you sure?')) {
      localStorage.clear();
      toast.warning('All local data cleared. Please refresh the page.');
    }
  };

  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const renderTabButton = (tabId, label, icon) => {
    const Icon = icon;
    return (
      <button
        onClick={() => setActiveTab(tabId)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          activeTab === tabId
            ? 'bg-green-100 text-green-700 border border-green-200'
            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
        }`}
      >
        <Icon className="w-4 h-4" />
        <span>{label}</span>
      </button>
    );
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">New Message Notifications</label>
              <p className="text-xs text-gray-500">Get notified when new messages arrive</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.newMessages}
              onChange={(e) => updateSetting('notifications', 'newMessages', e.target.checked)}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Connection Status Alerts</label>
              <p className="text-xs text-gray-500">Get notified about connection changes</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.connectionStatus}
              onChange={(e) => updateSetting('notifications', 'connectionStatus', e.target.checked)}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Sound Notifications</label>
              <p className="text-xs text-gray-500">Play sound for notifications</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.soundEnabled}
              onChange={(e) => updateSetting('notifications', 'soundEnabled', e.target.checked)}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">User Interface</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Theme</label>
              <p className="text-xs text-gray-500">Choose your preferred theme</p>
            </div>
            <select
              value={settings.ui.theme}
              onChange={(e) => updateSetting('ui', 'theme', e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Compact Mode</label>
              <p className="text-xs text-gray-500">Use compact layout for better space usage</p>
            </div>
            <input
              type="checkbox"
              checked={settings.ui.compactMode}
              onChange={(e) => updateSetting('ui', 'compactMode', e.target.checked)}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Privacy & Data</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Save Messages Locally</label>
              <p className="text-xs text-gray-500">Store message history in browser storage</p>
            </div>
            <input
              type="checkbox"
              checked={settings.privacy.saveMessages}
              onChange={(e) => updateSetting('privacy', 'saveMessages', e.target.checked)}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Auto Download Media</label>
              <p className="text-xs text-gray-500">Automatically download images and files</p>
            </div>
            <input
              type="checkbox"
              checked={settings.privacy.autoDownloadMedia}
              onChange={(e) => updateSetting('privacy', 'autoDownloadMedia', e.target.checked)}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Read Receipts</label>
              <p className="text-xs text-gray-500">Send read receipts for messages</p>
            </div>
            <input
              type="checkbox"
              checked={settings.privacy.readReceipts}
              onChange={(e) => updateSetting('privacy', 'readReceipts', e.target.checked)}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderConnectionSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Connection Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Auto Reconnect</label>
              <p className="text-xs text-gray-500">Automatically reconnect when connection is lost</p>
            </div>
            <input
              type="checkbox"
              checked={settings.connection.autoReconnect}
              onChange={(e) => updateSetting('connection', 'autoReconnect', e.target.checked)}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Session Timeout (minutes)</label>
              <p className="text-xs text-gray-500">How long to keep session active</p>
            </div>
            <input
              type="number"
              min="5"
              max="120"
              value={settings.connection.sessionTimeout}
              onChange={(e) => updateSetting('connection', 'sessionTimeout', parseInt(e.target.value))}
              className="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Max Retry Attempts</label>
              <p className="text-xs text-gray-500">Maximum reconnection attempts</p>
            </div>
            <input
              type="number"
              min="1"
              max="10"
              value={settings.connection.maxRetries}
              onChange={(e) => updateSetting('connection', 'maxRetries', parseInt(e.target.value))}
              className="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Current Status</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-2">
            <Wifi className={`w-5 h-5 ${
              isConnected ? 'text-green-500' : 'text-red-500'
            }`} />
            <span className="text-sm font-medium">
              Server: {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <MessageSquare className={`w-5 h-5 ${
              whatsappStatus === 'ready' ? 'text-green-500' : 'text-gray-400'
            }`} />
            <span className="text-sm font-medium">
              WhatsApp: {whatsappStatus === 'ready' ? 'Connected' : 'Not Connected'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDataSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Data Management</h3>
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800">Data Storage</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  All data is stored locally in your browser. No data is sent to external servers.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleClearData}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All Data</span>
            </button>
            <p className="text-xs text-gray-500">
              This will remove all messages, contacts, and settings from your browser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <SettingsIcon className="w-8 h-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        </div>
        <p className="text-gray-600">
          Configure your WhatsCRM preferences and connection settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-4">
            <nav className="space-y-2">
              {renderTabButton('general', 'General', SettingsIcon)}
              {renderTabButton('privacy', 'Privacy', Shield)}
              {renderTabButton('connection', 'Connection', Wifi)}
              {renderTabButton('data', 'Data', Database)}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow p-6">
            {activeTab === 'general' && renderGeneralSettings()}
            {activeTab === 'privacy' && renderPrivacySettings()}
            {activeTab === 'connection' && renderConnectionSettings()}
            {activeTab === 'data' && renderDataSettings()}

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <button
                  onClick={handleResetSettings}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Reset to Default</span>
                </button>
                
                <button
                  onClick={handleSaveSettings}
                  disabled={isLoading}
                  className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>{isLoading ? 'Saving...' : 'Save Settings'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;