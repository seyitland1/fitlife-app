import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  FiUser,
  FiEdit3,
  FiCamera,
  FiAward,
  FiZap,
  FiTarget,
  FiClock,
  FiActivity,
  FiHeart,
  FiTrendingUp,
  FiMapPin,
  FiMail,
  FiPhone,
  FiSettings,
  FiShare2,
  FiStar,
  FiBarChart2
} from 'react-icons/fi';

const ProfileContainer = styled(motion.div)`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 1rem;
  }
`;

const ProfileHeader = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  border-radius: 20px;
  padding: 2rem;
  color: white;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transform: translate(50%, -50%);
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
`;

const AvatarContainer = styled.div`
  position: relative;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 700;
  border: 4px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 100px;
    height: 100px;
    font-size: 2.5rem;
  }
`;

const EditAvatarButton = styled(motion.button)`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  color: ${props => props.theme.colors.primary};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${props => props.theme.shadows.md};
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserName = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

const UserTitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 1rem;
`;

const UserMeta = styled.div`
  display: flex;
  gap: 2rem;
  font-size: 0.9rem;
  opacity: 0.8;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProfileActions = styled.div`
  display: flex;
  gap: 1rem;
  position: relative;
  z-index: 1;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    justify-content: center;
  }
`;

const ActionButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  backdrop-filter: blur(10px);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadows.md};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  text-align: center;
`;

const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${props => props.color || props.theme.colors.primary}, ${props => props.colorSecondary || props.theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0 auto 1rem;
  font-size: 1.5rem;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: ${props => props.theme.colors.gray[800]};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.gray[600]};
  font-weight: 600;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadows.md};
  border: 1px solid ${props => props.theme.colors.gray[200]};
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: between;
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.gray[800]};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
`;

const CardAction = styled(motion.button)`
  padding: 0.5rem;
  border: none;
  background: ${props => props.theme.colors.gray[100]};
  color: ${props => props.theme.colors.gray[600]};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${props => props.theme.colors.gray[200]};
  }
`;

const AchievementGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
`;

const AchievementItem = styled(motion.div)`
  text-align: center;
  padding: 1rem;
  border-radius: 12px;
  background: ${props => props.theme.colors.gray[50]};
  border: 2px solid ${props => props.earned ? props.theme.colors.primary : props.theme.colors.gray[200]};
  opacity: ${props => props.earned ? 1 : 0.6};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const AchievementIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.earned ? 
    `linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.secondary})` : 
    props.theme.colors.gray[300]
  };
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0 auto 0.5rem;
  font-size: 1.2rem;
`;

const AchievementName = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${props => props.theme.colors.gray[700]};
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.gray[100]};

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.color || props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.gray[800]};
  margin-bottom: 0.25rem;
`;

const ActivityTime = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.gray[600]};
`;

const PersonalInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: ${props => props.theme.colors.gray[50]};
  border-radius: 12px;
`;

const InfoIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.gray[600]};
  margin-bottom: 0.25rem;
`;

const InfoValue = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.gray[800]};
`;

const Profile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);

  const stats = [
    {
      icon: <FiAward />,
      value: '1,247',
      label: 'Toplam Puan',
      color: '#ffd700',
      colorSecondary: '#ffed4e'
    },
    {
      icon: <FiZap />,
      value: '15',
      label: 'Günlük Seri',
      color: '#ef4444',
      colorSecondary: '#f87171'
    },
    {
      icon: <FiTarget />,
      value: '89%',
      label: 'Hedef Tamamlama',
      color: '#10b981',
      colorSecondary: '#34d399'
    },
    {
      icon: <FiActivity />,
      value: '156',
      label: 'Toplam Antrenman',
      color: '#8b5cf6',
      colorSecondary: '#a78bfa'
    }
  ];

  const achievements = [
    { id: 1, name: 'İlk Antrenman', icon: <FiZap />, earned: true },
    { id: 2, name: '7 Gün Seri', icon: <FiZap />, earned: true },
    { id: 3, name: 'Güç Ustası', icon: <FiAward />, earned: true },
    { id: 4, name: '30 Gün Seri', icon: <FiAward />, earned: false },
    { id: 5, name: 'Kardiyo Kraliçesi', icon: <FiHeart />, earned: false },
    { id: 6, name: 'Yoga Gurusu', icon: <FiStar />, earned: false }
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'Üst Vücut Antrenmanı Tamamlandı',
      time: '2 saat önce',
      icon: <FiActivity />,
      color: '#10b981'
    },
    {
      id: 2,
      title: 'Yeni Rozet Kazanıldı: Güç Ustası',
      time: '1 gün önce',
      icon: <FiAward />,
      color: '#ffd700'
    },
    {
      id: 3,
      title: 'Haftalık Hedef %75 Tamamlandı',
      time: '2 gün önce',
      icon: <FiTarget />,
      color: '#8b5cf6'
    },
    {
      id: 4,
      title: '7 Günlük Seri Başarısı',
      time: '3 gün önce',
      icon: <FiZap />,
      color: '#ef4444'
    }
  ];

  const personalInfo = [
    { label: 'E-posta', value: user?.email || 'user@fitme.com', icon: <FiMail /> },
    { label: 'Telefon', value: '+90 555 123 4567', icon: <FiPhone /> },
    { label: 'Konum', value: 'İstanbul, Türkiye', icon: <FiMapPin /> },
    { label: 'Üyelik Tarihi', value: 'Ocak 2024', icon: <FiClock /> }
  ];

  return (
    <ProfileContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ProfileHeader>
        <ProfileInfo>
          <AvatarContainer>
            <Avatar>
              {user?.name?.charAt(0) || 'S'}
            </Avatar>
            <EditAvatarButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiCamera size={18} />
            </EditAvatarButton>
          </AvatarContainer>
          
          <UserDetails>
            <UserName>{user?.name || 'Selin Aydın'}</UserName>
            <UserTitle>Fitness Tutkunu • Seviye 12</UserTitle>
            <UserMeta>
              <MetaItem>
                <FiMapPin size={14} />
                İstanbul, Türkiye
              </MetaItem>
              <MetaItem>
                <FiClock size={14} />
                Ocak 2024'ten beri üye
              </MetaItem>
              <MetaItem>
                <FiClock size={14} />
                Son aktiflik: 2 saat önce
              </MetaItem>
            </UserMeta>
          </UserDetails>
        </ProfileInfo>
        
        <ProfileActions>
          <ActionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(!isEditing)}
          >
            <FiEdit3 size={16} />
            Profili Düzenle
          </ActionButton>
          <ActionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiShare2 size={16} />
            Paylaş
          </ActionButton>
          <ActionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiSettings size={16} />
            Ayarlar
          </ActionButton>
        </ProfileActions>
      </ProfileHeader>

      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <StatIcon color={stat.color} colorSecondary={stat.colorSecondary}>
              {stat.icon}
            </StatIcon>
            <StatValue>{stat.value}</StatValue>
            <StatLabel>{stat.label}</StatLabel>
          </StatCard>
        ))}
      </StatsGrid>

      <ContentGrid>
        <MainContent>
          <Card
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <CardHeader>
              <CardTitle>
                <FiAward />
                Başarılar
              </CardTitle>
              <CardAction whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <FiBarChart2 size={16} />
              </CardAction>
            </CardHeader>
            <AchievementGrid>
              {achievements.map((achievement) => (
                <AchievementItem
                  key={achievement.id}
                  earned={achievement.earned}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AchievementIcon earned={achievement.earned}>
                    {achievement.icon}
                  </AchievementIcon>
                  <AchievementName>{achievement.name}</AchievementName>
                </AchievementItem>
              ))}
            </AchievementGrid>
          </Card>

          <Card
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <CardHeader>
              <CardTitle>
                <FiUser />
                Kişisel Bilgiler
              </CardTitle>
              <CardAction whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <FiEdit3 size={16} />
              </CardAction>
            </CardHeader>
            <PersonalInfoGrid>
              {personalInfo.map((info, index) => (
                <InfoItem key={index}>
                  <InfoIcon>{info.icon}</InfoIcon>
                  <InfoContent>
                    <InfoLabel>{info.label}</InfoLabel>
                    <InfoValue>{info.value}</InfoValue>
                  </InfoContent>
                </InfoItem>
              ))}
            </PersonalInfoGrid>
          </Card>
        </MainContent>

        <Sidebar>
          <Card
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <CardHeader>
              <CardTitle>
                <FiTrendingUp />
                Son Aktiviteler
              </CardTitle>
            </CardHeader>
            {recentActivities.map((activity) => (
              <ActivityItem key={activity.id}>
                <ActivityIcon color={activity.color}>
                  {activity.icon}
                </ActivityIcon>
                <ActivityContent>
                  <ActivityTitle>{activity.title}</ActivityTitle>
                  <ActivityTime>{activity.time}</ActivityTime>
                </ActivityContent>
              </ActivityItem>
            ))}
          </Card>
        </Sidebar>
      </ContentGrid>
    </ProfileContainer>
  );
};

export default Profile;