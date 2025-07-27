import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiStar,
  FiAward,
  FiTrendingUp,
  FiUsers,
  FiClock,
  FiTarget,
  FiZap,
  FiChevronUp,
  FiChevronDown,
  FiMinus,
  FiHeart,
  FiShield
} from 'react-icons/fi';

const LeaderboardContainer = styled(motion.div)`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${props => props.theme.colors.gray[800]};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.gray[600]};
  margin-bottom: 2rem;
`;

const FilterTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterTab = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border: 2px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.gray[200]};
  background: ${props => props.active ? props.theme.colors.primary : 'white'};
  color: ${props => props.active ? 'white' : props.theme.colors.gray[600]};
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const TopThreeSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const PodiumCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2rem 1.5rem;
  text-align: center;
  box-shadow: ${props => props.theme.shadows.xl};
  border: 3px solid ${props => {
    switch (props.position) {
      case 1: return '#ffd700';
      case 2: return '#c0c0c0';
      case 3: return '#cd7f32';
      default: return props.theme.colors.gray[200];
    }
  }};
  position: relative;
  min-width: 200px;
  height: ${props => {
    switch (props.position) {
      case 1: return '280px';
      case 2: return '240px';
      case 3: return '220px';
      default: return '200px';
    }
  }};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &::before {
    content: '';
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 30px;
    background: ${props => {
      switch (props.position) {
        case 1: return '#ffd700';
        case 2: return '#c0c0c0';
        case 3: return '#cd7f32';
        default: return props.theme.colors.gray[300];
      }
    }};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 0.9rem;
  }
`;

const PodiumAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 auto 1rem;
  position: relative;

  &::after {
    content: '${props => props.position}';
    position: absolute;
    top: -10px;
    right: -10px;
    width: 30px;
    height: 30px;
    background: ${props => {
      switch (props.position) {
        case 1: return '#ffd700';
        case 2: return '#c0c0c0';
        case 3: return '#cd7f32';
        default: return props.theme.colors.gray[300];
      }
    }};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 0.9rem;
    border: 2px solid white;
  }
`;

const PodiumName = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${props => props.theme.colors.gray[800]};
  margin-bottom: 0.5rem;
`;

const PodiumScore = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const PodiumBadge = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.gray[600]};
  font-weight: 600;
`;

const LeaderboardTable = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: ${props => props.theme.shadows.lg};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  overflow: hidden;
`;

const TableHeader = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 60px 1fr 120px 120px 100px;
  gap: 1rem;
  font-weight: 600;
  font-size: 0.9rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 50px 1fr 80px 80px;
    gap: 0.5rem;
    padding: 1rem;
    font-size: 0.8rem;
  }
`;

const TableRow = styled(motion.div)`
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 60px 1fr 120px 120px 100px;
  gap: 1rem;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.gray[100]};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.gray[50]};
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 50px 1fr 80px 80px;
    gap: 0.5rem;
    padding: 1rem;
  }
`;

const RankCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  color: ${props => {
    if (props.rank <= 3) {
      switch (props.rank) {
        case 1: return '#ffd700';
        case 2: return '#c0c0c0';
        case 3: return '#cd7f32';
        default: return props.theme.colors.gray[600];
      }
    }
    return props.theme.colors.gray[600];
  }};
  position: relative;
`;

const RankChange = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.7rem;
  color: ${props => {
    if (props.change > 0) return '#10b981';
    if (props.change < 0) return '#ef4444';
    return '#6b7280';
  }};
  margin-top: 0.25rem;
`;

const UserCell = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  flex-shrink: 0;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.gray[800]};
  margin-bottom: 0.25rem;
  font-size: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 0.9rem;
  }
`;

const UserLevel = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.gray[600]};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ScoreCell = styled.div`
  font-weight: 700;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.primary};
  text-align: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1rem;
  }
`;

const StreakCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.gray[700]};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 0.9rem;
  }
`;

const BadgeCell = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const Badge = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${props => {
    switch (props.type) {
      case 'gold': return '#ffd700';
      case 'silver': return '#c0c0c0';
      case 'bronze': return '#cd7f32';
      case 'fire': return '#ef4444';
      case 'star': return '#8b5cf6';
      default: return props.theme.colors.gray[300];
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
`;

const MyRankCard = styled(motion.div)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${props => props.theme.shadows.lg};
`;

const MyRankInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MyRankStats = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    gap: 1rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  opacity: 0.9;
`;

const Leaderboard = ({ user }) => {
  const [activeFilter, setActiveFilter] = useState('Bu Hafta');
  const [leaderboardData, setLeaderboardData] = useState([
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      avatar: 'AY',
      score: 2450,
      streak: 15,
      level: 'Pro Atlet',
      rank: 1,
      change: 2,
      badges: ['gold', 'fire']
    },
    {
      id: 2,
      name: 'Elif Kaya',
      avatar: 'EK',
      score: 2380,
      streak: 12,
      level: 'Fitness Uzmanı',
      rank: 2,
      change: -1,
      badges: ['silver', 'star']
    },
    {
      id: 3,
      name: 'Mehmet Demir',
      avatar: 'MD',
      score: 2290,
      streak: 18,
      level: 'Güç Antrenörü',
      rank: 3,
      change: 1,
      badges: ['bronze', 'fire']
    },
    {
      id: 4,
      name: 'Ayşe Özkan',
      avatar: 'AÖ',
      score: 2150,
      streak: 8,
      level: 'Kardiyo Kraliçesi',
      rank: 4,
      change: 0,
      badges: ['star']
    },
    {
      id: 5,
      name: 'Can Arslan',
      avatar: 'CA',
      score: 2080,
      streak: 22,
      level: 'Dayanıklılık Ustası',
      rank: 5,
      change: 3,
      badges: ['fire']
    },
    {
      id: 6,
      name: 'Zeynep Şahin',
      avatar: 'ZŞ',
      score: 1950,
      streak: 6,
      level: 'Yoga Gurusu',
      rank: 6,
      change: -2,
      badges: ['star']
    },
    {
      id: 7,
      name: 'Burak Çelik',
      avatar: 'BÇ',
      score: 1890,
      streak: 14,
      level: 'Güç Sporcu',
      rank: 7,
      change: 1,
      badges: ['bronze']
    },
    {
      id: 8,
      name: 'Selin Aydın',
      avatar: 'SA',
      score: 1820,
      streak: 9,
      level: 'Fitness Tutkunu',
      rank: 8,
      change: -1,
      badges: []
    }
  ]);

  const filterOptions = [
    { name: 'Bu Hafta', icon: FiClock },
    { name: 'Bu Ay', icon: FiTrendingUp },
    { name: 'Tüm Zamanlar', icon: FiStar },
    { name: 'Arkadaşlar', icon: FiUsers }
  ];

  const myRank = {
    position: 12,
    score: 1650,
    streak: 5,
    change: 2
  };

  const topThree = leaderboardData.slice(0, 3);
  const restOfLeaderboard = leaderboardData.slice(3);

  const getRankChangeIcon = (change) => {
    if (change > 0) return <FiChevronUp size={12} />;
    if (change < 0) return <FiChevronDown size={12} />;
    return <FiMinus size={12} />;
  };

  const getBadgeIcon = (type) => {
    switch (type) {
      case 'gold': return <FiHeart size={14} />;
      case 'silver': return <FiShield size={14} />;
      case 'bronze': return <FiAward size={14} />;
      case 'fire': return <FiZap size={14} />;
      case 'star': return <FiStar size={14} />;
      default: return <FiZap size={14} />;
    }
  };

  return (
    <LeaderboardContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header>
        <Title>
          <FiStar />
          Liderlik Tablosu
        </Title>
        <Subtitle>
          Fitness topluluğumuzun en aktif üyeleriyle yarışın ve ilham alın.
        </Subtitle>
      </Header>

      <FilterTabs>
        {filterOptions.map((option) => {
          const IconComponent = option.icon;
          return (
            <FilterTab
              key={option.name}
              active={activeFilter === option.name}
              onClick={() => setActiveFilter(option.name)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconComponent size={16} />
              {option.name}
            </FilterTab>
          );
        })}
      </FilterTabs>

      <MyRankCard
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <MyRankInfo>
          <UserAvatar>{user?.name?.charAt(0) || 'S'}</UserAvatar>
          <div>
            <UserName style={{ color: 'white', marginBottom: '0.25rem' }}>
              Senin Sıralaman
            </UserName>
            <UserLevel style={{ color: 'rgba(255,255,255,0.8)' }}>
              #{myRank.position} • {user?.level || 'Başlangıç Seviyesi'}
            </UserLevel>
          </div>
        </MyRankInfo>
        
        <MyRankStats>
          <StatItem>
            <StatValue>{myRank.score}</StatValue>
            <StatLabel>Puan</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{myRank.streak}</StatValue>
            <StatLabel>Seri</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'center' }}>
              {getRankChangeIcon(myRank.change)}
              {Math.abs(myRank.change)}
            </StatValue>
            <StatLabel>Değişim</StatLabel>
          </StatItem>
        </MyRankStats>
      </MyRankCard>

      <TopThreeSection>
        {topThree.map((user, index) => (
          <PodiumCard
            key={user.id}
            position={user.rank}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div>
              <PodiumAvatar position={user.rank}>
                {user.avatar}
              </PodiumAvatar>
              <PodiumName>{user.name}</PodiumName>
              <PodiumScore>{user.score.toLocaleString()}</PodiumScore>
            </div>
            <PodiumBadge>{user.level}</PodiumBadge>
          </PodiumCard>
        ))}
      </TopThreeSection>

      <LeaderboardTable>
        <TableHeader>
          <div>Sıra</div>
          <div>Kullanıcı</div>
          <div>Puan</div>
          <div>Seri</div>
          <div>Rozet</div>
        </TableHeader>
        
        <AnimatePresence>
          {restOfLeaderboard.map((user, index) => (
            <TableRow
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
            >
              <RankCell rank={user.rank}>
                <div>
                  #{user.rank}
                  <RankChange change={user.change}>
                    {getRankChangeIcon(user.change)}
                    {user.change !== 0 && Math.abs(user.change)}
                  </RankChange>
                </div>
              </RankCell>
              
              <UserCell>
                <UserAvatar>{user.avatar}</UserAvatar>
                <UserInfo>
                  <UserName>{user.name}</UserName>
                  <UserLevel>
                    <FiTarget size={12} />
                    {user.level}
                  </UserLevel>
                </UserInfo>
              </UserCell>
              
              <ScoreCell>{user.score.toLocaleString()}</ScoreCell>
              
              <StreakCell>
                <FiZap size={16} />
                {user.streak}
              </StreakCell>
              
              <BadgeCell>
                {user.badges.length > 0 && (
                  <Badge type={user.badges[0]}>
                    {getBadgeIcon(user.badges[0])}
                  </Badge>
                )}
              </BadgeCell>
            </TableRow>
          ))}
        </AnimatePresence>
      </LeaderboardTable>
    </LeaderboardContainer>
  );
};

export default Leaderboard;