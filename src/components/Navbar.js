import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiBell, FiSearch, FiUser, FiSettings, FiLogOut, FiActivity } from 'react-icons/fi';

const NavbarContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 80px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${props => props.theme.colors.gray[200]};
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  padding: 0 2rem;
  z-index: 1002;
  box-shadow: ${props => props.theme.shadows.sm};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    height: 70px;
    padding: 0 1rem;
    grid-template-columns: auto 1fr auto;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 0.75rem;
    grid-template-columns: auto 1fr auto;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-self: start;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;

const LogoIcon = styled(FiActivity)`
  color: ${props => props.theme.colors.primary};
`;

const MenuButton = styled(motion.button)`
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: ${props => props.theme.colors.gray[100]};
  border-radius: 10px;
  cursor: pointer;
  color: ${props => props.theme.colors.gray[600]};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.gray[200]};
    color: ${props => props.theme.colors.primary};
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: flex;
  }
`;

const CenterSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: center;
  width: 100%;
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  max-width: 500px;
  width: 100%;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    max-width: 300px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    max-width: 200px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 1rem 0 2.5rem;
  border: 1px solid ${props => props.theme.colors.gray[300]};
  border-radius: 20px;
  background: ${props => props.theme.colors.white};
  font-size: 0.9rem;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.gray[400]};
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    height: 36px;
    font-size: 0.85rem;
    padding: 0 0.75rem 0 2rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    height: 32px;
    font-size: 0.8rem;
    padding: 0 0.5rem 0 1.75rem;
  }
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 0.75rem;
  color: ${props => props.theme.colors.gray[400]};
  pointer-events: none;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    left: 0.5rem;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-self: end;
`;

const NotificationButton = styled(motion.button)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: ${props => props.theme.colors.gray[100]};
  border-radius: 10px;
  cursor: pointer;
  color: ${props => props.theme.colors.gray[600]};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.gray[200]};
    color: ${props => props.theme.colors.primary};
  }
`;

const NotificationBadge = styled.div`
  position: absolute;
  top: -2px;
  right: -2px;
  width: 18px;
  height: 18px;
  background: ${props => props.theme.colors.error};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  color: white;
  font-weight: 600;
`;

const UserSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const UserButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border: none;
  background: transparent;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.gray[100]};
  }
`;

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(45deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const UserName = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${props => props.theme.colors.gray[800]};
`;

const UserLevel = styled.span`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.gray[500]};
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  width: 200px;
  background: white;
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadows.lg};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  overflow: hidden;
  z-index: 1003;
`;

const DropdownItem = styled(motion.button)`
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.gray[700]};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.gray[50]};
    color: ${props => props.theme.colors.primary};
  }

  &:last-child {
    border-top: 1px solid ${props => props.theme.colors.gray[200]};
    color: ${props => props.theme.colors.error};

    &:hover {
      background: ${props => props.theme.colors.error};
      color: white;
    }
  }
`;

const Navbar = ({ onMenuClick, user, notifications = [], onLogout }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Implement search functionality
    }
  };

  const handleLogout = () => {
    setShowUserMenu(false);
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <NavbarContainer
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <LeftSection>
        <MenuButton
          onClick={onMenuClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiMenu size={20} />
        </MenuButton>
        
        <Logo>
          <LogoIcon size={24} />
          <span>FitLife</span>
        </Logo>
      </LeftSection>

      <CenterSection>
        <SearchContainer>
          <form onSubmit={handleSearch}>
            <SearchIcon size={16} />
            <SearchInput
              type="text"
              placeholder="Antrenman, tarif veya egzersiz ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </SearchContainer>
      </CenterSection>

      <RightSection>
        <NotificationButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiBell size={18} />
          {notifications.length > 0 && (
            <NotificationBadge>
              {notifications.length > 9 ? '9+' : notifications.length}
            </NotificationBadge>
          )}
        </NotificationButton>

        <UserSection>
          <UserButton
            onClick={() => setShowUserMenu(!showUserMenu)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <UserAvatar>
              {user?.name?.charAt(0) || 'U'}
            </UserAvatar>
            <UserInfo>
              <UserName>{user?.name || 'Kullanıcı'}</UserName>
              <UserLevel>{user?.level || 'Başlangıç'}</UserLevel>
            </UserInfo>
          </UserButton>

          <AnimatePresence>
            {showUserMenu && (
              <DropdownMenu
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <DropdownItem
                  onClick={() => setShowUserMenu(false)}
                  whileHover={{ x: 4 }}
                >
                  <FiUser size={16} />
                  Profil
                </DropdownItem>
                <DropdownItem
                  onClick={() => setShowUserMenu(false)}
                  whileHover={{ x: 4 }}
                >
                  <FiSettings size={16} />
                  Ayarlar
                </DropdownItem>
                <DropdownItem
                  onClick={handleLogout}
                  whileHover={{ x: 4 }}
                >
                  <FiLogOut size={16} />
                  Çıkış Yap
                </DropdownItem>
              </DropdownMenu>
            )}
          </AnimatePresence>
        </UserSection>
      </RightSection>
    </NavbarContainer>
  );
};

export default Navbar;