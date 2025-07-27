import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  FiTarget,
  FiTrendingUp,
  FiClock,
  FiUsers,
  FiAward,
  FiStar,
  FiPlayCircle,
  FiCheck,
  FiLock,
  FiZap,
  FiActivity,
  FiHeart,
  FiSun,
  FiMoon,
  FiWind
} from 'react-icons/fi';

const ChallengesContainer = styled(motion.div)`
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
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
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, ${props => props.color}, ${props => props.colorSecondary});
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  margin: 0 auto 1rem;
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

const CategoryTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.gray[100]};
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: 2px;
  }
`;

const CategoryTab = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border: 2px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.gray[200]};
  background: ${props => props.active ? props.theme.colors.primary : 'white'};
  color: ${props => props.active ? 'white' : props.theme.colors.gray[600]};
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const ChallengesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const ChallengeCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.lg};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

const ChallengeHeader = styled.div`
  height: 160px;
  background: linear-gradient(135deg, ${props => props.color}, ${props => props.colorSecondary});
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 50%);
  }
`;

const ChallengeBadge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: ${props => {
    switch (props.type) {
      case 'new': return '#10b981';
      case 'popular': return '#f59e0b';
      case 'premium': return '#8b5cf6';
      case 'limited': return '#ef4444';
      default: return props.theme.colors.primary;
    }
  }};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 1;
`;

const ChallengeStatus = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => {
    switch (props.status) {
      case 'completed': return '#10b981';
      case 'active': return '#f59e0b';
      case 'locked': return '#6b7280';
      default: return 'rgba(255,255,255,0.9)';
    }
  }};
  color: ${props => props.status === 'locked' ? 'white' : props.theme.colors.gray[800]};
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  z-index: 1;
`;

const ChallengeInfo = styled.div`
  padding: 1.5rem;
`;

const ChallengeCategory = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.gray[500]};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
`;

const ChallengeTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${props => props.theme.colors.gray[800]};
  margin-bottom: 0.5rem;
  line-height: 1.3;
`;

const ChallengeDescription = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const ChallengeMeta = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.gray[600]};
  font-weight: 600;
`;

const ProgressSection = styled.div`
  margin-bottom: 1rem;
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.gray[600]};
  font-weight: 600;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${props => props.theme.colors.gray[200]};
  border-radius: 4px;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  background: linear-gradient(90deg, ${props => props.color}, ${props => props.colorSecondary});
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const ChallengeFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RewardInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.gray[600]};
  font-weight: 600;
`;

const ActionButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: ${props => {
    switch (props.variant) {
      case 'start': return props.theme.colors.primary;
      case 'continue': return '#f59e0b';
      case 'completed': return '#10b981';
      case 'locked': return props.theme.colors.gray[400];
      default: return props.theme.colors.primary;
    }
  }};
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: ${props => props.variant === 'locked' ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  opacity: ${props => props.variant === 'locked' ? 0.6 : 1};

  &:hover {
    transform: ${props => props.variant !== 'locked' ? 'translateY(-1px)' : 'none'};
  }
`;

const Challenges = () => {
  const [activeCategory, setActiveCategory] = useState('Tümü');

  const categories = [
    'Tümü',
    '30 Günlük',
    'Haftalık',
    'Günlük',
    'Özel'
  ];

  const stats = [
    {
      icon: <FiTarget />,
      value: '12',
      label: 'Tamamlanan',
      color: '#10b981',
      colorSecondary: '#34d399'
    },
    {
      icon: <FiZap />,
      value: '3',
      label: 'Aktif',
      color: '#f59e0b',
      colorSecondary: '#fbbf24'
    },
    {
      icon: <FiAward />,
      value: '1,250',
      label: 'Toplam Puan',
      color: '#8b5cf6',
      colorSecondary: '#a78bfa'
    },
    {
      icon: <FiTrendingUp />,
      value: '15',
      label: 'Günlük Seri',
      color: '#ef4444',
      colorSecondary: '#f87171'
    }
  ];

  const challenges = [
    {
      id: 1,
      title: '30 Günlük Kardiyo Mücadelesi',
      category: '30 Günlük',
      description: 'Her gün en az 30 dakika kardiyo egzersizi yapın ve dayanıklılığınızı artırın.',
      duration: '30 gün',
      participants: '2,456',
      reward: '500 puan',
      difficulty: 'Orta',
      progress: 65,
      status: 'active',
      badge: 'popular',
      color: '#ef4444',
      colorSecondary: '#f87171',
      icon: <FiActivity />
    },
    {
      id: 2,
      title: 'Haftalık Güç Antrenmanı',
      category: 'Haftalık',
      description: 'Haftada 3 kez güç antrenmanı yaparak kas kütlenizi artırın.',
      duration: '1 hafta',
      participants: '1,234',
      reward: '200 puan',
      difficulty: 'Zor',
      progress: 0,
      status: 'available',
      badge: 'new',
      color: '#8b5cf6',
      colorSecondary: '#a78bfa',
      icon: <FiZap />
    },
    {
      id: 3,
      title: 'Günlük Meditasyon',
      category: 'Günlük',
      description: 'Her gün 10 dakika meditasyon yaparak zihinsel sağlığınızı güçlendirin.',
      duration: '1 gün',
      participants: '3,789',
      reward: '50 puan',
      difficulty: 'Kolay',
      progress: 100,
      status: 'completed',
      badge: null,
      color: '#06b6d4',
      colorSecondary: '#22d3ee',
      icon: <FiHeart />
    },
    {
      id: 4,
      title: 'Sabah Yoga Rutini',
      category: 'Haftalık',
      description: 'Her sabah 20 dakika yoga yaparak güne enerjik başlayın.',
      duration: '1 hafta',
      participants: '987',
      reward: '300 puan',
      difficulty: 'Kolay',
      progress: 42,
      status: 'active',
      badge: null,
      color: '#f59e0b',
      colorSecondary: '#fbbf24',
      icon: <FiSun />
    },
    {
      id: 5,
      title: 'Uyku Kalitesi Mücadelesi',
      category: '30 Günlük',
      description: '30 gün boyunca düzenli uyku saatleri ile uyku kalitenizi artırın.',
      duration: '30 gün',
      participants: '1,567',
      reward: '400 puan',
      difficulty: 'Orta',
      progress: 0,
      status: 'locked',
      badge: 'premium',
      color: '#6366f1',
      colorSecondary: '#8b5cf6',
      icon: <FiMoon />
    },
    {
      id: 6,
      title: 'Nefes Egzersizi Serisi',
      category: 'Haftalık',
      description: 'Haftada 5 kez nefes egzersizi yaparak stres seviyenizi azaltın.',
      duration: '1 hafta',
      participants: '654',
      reward: '250 puan',
      difficulty: 'Kolay',
      progress: 0,
      status: 'available',
      badge: 'limited',
      color: '#10b981',
      colorSecondary: '#34d399',
      icon: <FiWind />
    }
  ];

  const filteredChallenges = challenges.filter(challenge => {
    return activeCategory === 'Tümü' || challenge.category === activeCategory;
  });

  const getBadgeText = (type) => {
    switch (type) {
      case 'new': return 'YENİ';
      case 'popular': return 'POPÜLER';
      case 'premium': return 'PREMİUM';
      case 'limited': return 'SINIRLI';
      default: return '';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <FiCheck size={20} />;
      case 'active': return <FiPlayCircle size={16} />;
      case 'locked': return <FiLock size={16} />;
      default: return <FiPlayCircle size={16} />;
    }
  };

  const getActionButton = (challenge) => {
    switch (challenge.status) {
      case 'completed':
        return (
          <ActionButton variant="completed">
            <FiCheck size={16} />
            Tamamlandı
          </ActionButton>
        );
      case 'active':
        return (
          <ActionButton 
            variant="continue"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiPlayCircle size={16} />
            Devam Et
          </ActionButton>
        );
      case 'locked':
        return (
          <ActionButton variant="locked">
            <FiLock size={16} />
            Kilitli
          </ActionButton>
        );
      default:
        return (
          <ActionButton 
            variant="start"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiPlayCircle size={16} />
            Başla
          </ActionButton>
        );
    }
  };

  return (
    <ChallengesContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header>
        <Title>
          <FiTarget />
          Mücadeleler
        </Title>
        <Subtitle>
          Hedeflerinize ulaşmak için mücadelelere katılın ve ödüller kazanın.
        </Subtitle>
      </Header>

      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <StatIcon color={stat.color} colorSecondary={stat.colorSecondary}>
              {stat.icon}
            </StatIcon>
            <StatValue>{stat.value}</StatValue>
            <StatLabel>{stat.label}</StatLabel>
          </StatCard>
        ))}
      </StatsGrid>

      <CategoryTabs>
        {categories.map((category) => (
          <CategoryTab
            key={category}
            active={activeCategory === category}
            onClick={() => setActiveCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </CategoryTab>
        ))}
      </CategoryTabs>

      <ChallengesGrid>
        {filteredChallenges.map((challenge, index) => (
          <ChallengeCard
            key={challenge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <ChallengeHeader color={challenge.color} colorSecondary={challenge.colorSecondary}>
              {challenge.icon}
              {challenge.badge && (
                <ChallengeBadge type={challenge.badge}>
                  {getBadgeText(challenge.badge)}
                </ChallengeBadge>
              )}
              <ChallengeStatus status={challenge.status}>
                {getStatusIcon(challenge.status)}
              </ChallengeStatus>
            </ChallengeHeader>
            
            <ChallengeInfo>
              <ChallengeCategory>{challenge.category}</ChallengeCategory>
              <ChallengeTitle>{challenge.title}</ChallengeTitle>
              <ChallengeDescription>{challenge.description}</ChallengeDescription>
              
              <ChallengeMeta>
                <MetaItem>
                  <FiClock size={14} />
                  {challenge.duration}
                </MetaItem>
                <MetaItem>
                  <FiUsers size={14} />
                  {challenge.participants} katılımcı
                </MetaItem>
                <MetaItem>
                  <FiStar size={14} />
                  {challenge.difficulty}
                </MetaItem>
                <MetaItem>
                  <FiAward size={14} />
                  {challenge.reward}
                </MetaItem>
              </ChallengeMeta>
              
              {challenge.status === 'active' && (
                <ProgressSection>
                  <ProgressLabel>
                    <span>İlerleme</span>
                    <span>%{challenge.progress}</span>
                  </ProgressLabel>
                  <ProgressBar>
                    <Progress 
                      progress={challenge.progress} 
                      color={challenge.color}
                      colorSecondary={challenge.colorSecondary}
                    />
                  </ProgressBar>
                </ProgressSection>
              )}
              
              <ChallengeFooter>
                <RewardInfo>
                  <FiAward size={16} />
                  {challenge.reward}
                </RewardInfo>
                {getActionButton(challenge)}
              </ChallengeFooter>
            </ChallengeInfo>
          </ChallengeCard>
        ))}
      </ChallengesGrid>
    </ChallengesContainer>
  );
};

export default Challenges;