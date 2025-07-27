import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LoadingScreen from './components/LoadingScreen';

// Pages
import Home from './pages/Home';
import Workouts from './pages/Workouts';
import AICoach from './pages/AICoach';
import Recipes from './pages/Recipes';
import Store from './pages/Store';
import Meditation from './pages/Meditation';
import Breathing from './pages/Breathing';
import Challenges from './pages/Challenges';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';

// Theme
const theme = {
  colors: {
    primary: '#667eea',
    secondary: '#764ba2',
    accent: '#f093fb',
    success: '#4ade80',
    warning: '#fbbf24',
    error: '#ef4444',
    dark: '#1f2937',
    light: '#f8fafc',
    white: '#ffffff',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827'
    }
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1200px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  }
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    background: ${props => props.theme.colors.gray[50]};
    color: ${props => props.theme.colors.dark};
    overflow-x: hidden;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.gray[100]};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.secondary};
  }
`;

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  position: relative;
`;

const MainContent = styled(motion.main)`
  flex: 1;
  margin-left: ${props => props.sidebarOpen ? '280px' : '80px'};
  padding-top: 80px;
  transition: all 0.3s ease;
  min-height: 100vh;
  background: ${props => props.theme.colors.gray[50]};
  width: calc(100% - ${props => props.sidebarOpen ? '280px' : '80px'});
  position: relative;
  z-index: 1;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin-left: 0;
    padding-top: 70px;
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
    z-index: 1;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 70px;
    z-index: 1;
  }
`;

function App() {
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check for existing authentication
    const initializeApp = async () => {
      try {
        // Simulate checking for stored auth token
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Check localStorage for saved user session
        const savedUser = localStorage.getItem('fitlife_user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setIsAuthenticated(true);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('App initialization failed:', error);
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Handle responsive sidebar behavior
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // Auto-close sidebar on mobile
      if (mobile && sidebarOpen) {
        setSidebarOpen(false);
      }
      // Auto-open sidebar on desktop if it was closed
      else if (!mobile && !sidebarOpen) {
        setSidebarOpen(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [sidebarOpen]);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    // Save user session to localStorage
    localStorage.setItem('fitlife_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('fitlife_user');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <LoadingScreen />
      </ThemeProvider>
    );
  }

  // Show login screen if user is not authenticated
  if (!isAuthenticated) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Login onLogin={handleLogin} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <AppContainer>
          <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} user={user} />
          <Navbar 
            onMenuClick={toggleSidebar} 
            user={user} 
            notifications={notifications}
            onLogout={handleLogout}
          />
          
          <MainContent 
            sidebarOpen={sidebarOpen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home user={user} />} />
                <Route path="/workouts" element={<Workouts />} />
                <Route path="/ai-coach" element={<AICoach user={user} />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/store" element={<Store />} />
                <Route path="/meditation" element={<Meditation />} />
                <Route path="/breathing" element={<Breathing />} />
                <Route path="/challenges" element={<Challenges user={user} />} />
                <Route path="/leaderboard" element={<Leaderboard user={user} />} />
                <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>
          </MainContent>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;