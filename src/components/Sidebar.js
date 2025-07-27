import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome,
  FiActivity,
  FiZap,
  FiShoppingBag,
  FiHeart,
  FiWind,
  FiTrendingUp,
  FiAward,
  FiUser,
  FiSettings,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';

const SidebarContainer = styled(motion.aside)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: ${props => props.isOpen ? '280px' : '80px'};
  background: linear-gradient(180deg, ${props => props.theme.colors.white} 0%, ${props => props.theme.colors.gray[50]} 100%);
  border-right: 1px solid ${props => props.theme.colors.gray[200]};
  transition: all 0.3s ease;
  z-index: 1001;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.lg};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
    width: 280px;
    box-shadow: ${props => props.isOpen ? '0 0 30px rgba(0, 0, 0, 0.4)' : 'none'};
    z-index: 1001;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100vw;
    max-width: 280px;
    z-index: 1001;
  }
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.gray[200]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    height: 70px;
    padding: 1rem;
  }
`;

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
`;

const LogoText = styled(motion.span)`
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(45deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ToggleButton = styled(motion.button)`
  width: 32px;
  height: 32px;
  border: none;
  background: ${props => props.theme.colors.gray[100]};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.theme.colors.gray[600]};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.gray[200]};
    color: ${props => props.theme.colors.primary};
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }

  @media (min-width: calc(${props => props.theme.breakpoints.tablet} + 1px)) {
    display: flex;
  }
`;

const Navigation = styled.nav`
  padding: 1rem 0;
  flex: 1;
  overflow-y: auto;
`;

const NavSection = styled.div`
  margin-bottom: 2rem;
`;

const NavSectionTitle = styled(motion.h3)`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${props => props.theme.colors.gray[500]};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0 1.5rem;
  margin-bottom: 0.75rem;
`;

const NavItem = styled(motion.div)`
  margin: 0.25rem 1rem;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  text-decoration: none;
  color: ${props => props.isActive ? props.theme.colors.primary : props.theme.colors.gray[600]};
  background: ${props => props.isActive ? `${props.theme.colors.primary}15` : 'transparent'};
  font-weight: ${props => props.isActive ? '600' : '500'};
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background: ${props => props.isActive ? `${props.theme.colors.primary}20` : props.theme.colors.gray[100]};
    color: ${props => props.theme.colors.primary};
    transform: translateX(2px);
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 3px;
    background: ${props => props.theme.colors.primary};
    transform: scaleY(${props => props.isActive ? 1 : 0});
    transition: transform 0.2s ease;
  }
`;

const NavIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`;

const NavText = styled(motion.span)`
  font-size: 0.9rem;
  white-space: nowrap;
`;

const UserSection = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid ${props => props.theme.colors.gray[200]};
  margin-top: auto;
`;

const UserCard = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}10, ${props => props.theme.colors.secondary}10);
  border-radius: 12px;
  border: 1px solid ${props => props.theme.colors.primary}20;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(45deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  flex-shrink: 0;
`;

const UserInfo = styled(motion.div)`
  flex: 1;
  min-width: 0;
`;

const UserName = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${props => props.theme.colors.gray[800]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserStats = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.25rem;
`;

const UserStat = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.gray[600]};
`;

const menuItems = [
  {
    section: 'Ana Menü',
    items: [
      { path: '/', icon: FiHome, label: 'Ana Sayfa' },
      { path: '/workouts', icon: FiActivity, label: 'Antrenmanlar' },
      { path: '/ai-coach', icon: FiZap, label: 'AI Koç' },
      { path: '/recipes', icon: FiHeart, label: 'Tarifler' }
    ]
  },
  {
    section: 'Özellikler',
    items: [
      { path: '/store', icon: FiShoppingBag, label: 'Mağaza' },
      { path: '/meditation', icon: FiHeart, label: 'Meditasyon' },
      { path: '/breathing', icon: FiWind, label: 'Nefes Egzersizleri' }
    ]
  },
  {
    section: 'Sosyal',
    items: [
      { path: '/challenges', icon: FiTrendingUp, label: 'Mücadeleler' },
      { path: '/leaderboard', icon: FiAward, label: 'Liderlik Tablosu' }
    ]
  },
  {
    section: 'Hesap',
    items: [
      { path: '/profile', icon: FiUser, label: 'Profil' },
      { path: '/settings', icon: FiSettings, label: 'Ayarlar' }
    ]
  }
];

const Sidebar = ({ isOpen, onToggle, user }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1000
            }}
            onClick={onToggle}
          />
        )}
      </AnimatePresence>
      
      <SidebarContainer
        isOpen={isOpen}
        initial={{ x: isMobile ? -280 : 0 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
      <SidebarHeader>
        <Logo>
          <LogoIcon>💪</LogoIcon>
          {isOpen && (
            <LogoText
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              FitMe
            </LogoText>
          )}
        </Logo>
        
        <ToggleButton
          onClick={onToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? <FiChevronLeft size={16} /> : <FiChevronRight size={16} />}
        </ToggleButton>
      </SidebarHeader>

      <Navigation>
        {menuItems.map((section, sectionIndex) => (
          <NavSection key={sectionIndex}>
            {isOpen && (
              <NavSectionTitle
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: sectionIndex * 0.1 }}
              >
                {section.section}
              </NavSectionTitle>
            )}
            
            {section.items.map((item, itemIndex) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <NavItem
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (sectionIndex * 0.1) + (itemIndex * 0.05) }}
                >
                  <NavLink to={item.path} isActive={isActive}>
                    <NavIcon>
                      <Icon size={20} />
                    </NavIcon>
                    {isOpen && (
                      <NavText
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </NavText>
                    )}
                  </NavLink>
                </NavItem>
              );
            })}
          </NavSection>
        ))}
      </Navigation>

      {isOpen && user && (
        <UserSection>
          <UserCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <UserAvatar>
              {user.name?.charAt(0) || 'U'}
            </UserAvatar>
            <UserInfo
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <UserName>{user.name}</UserName>
              <UserStats>
                <UserStat>{user.points} puan</UserStat>
                <UserStat>{user.streak} gün</UserStat>
              </UserStats>
            </UserInfo>
          </UserCard>
        </UserSection>
      )}
      </SidebarContainer>
    </>
  );
};

export default Sidebar;