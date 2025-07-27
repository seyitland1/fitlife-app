import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiActivity,
  FiZap,
  FiTrendingUp,
  FiAward,
  FiTarget,
  FiHeart,
  FiClock,
  FiChevronRight
} from 'react-icons/fi';

const HomeContainer = styled(motion.div)`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 1rem;
  }
`;

const WelcomeSection = styled(motion.div)`
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

const WelcomeContent = styled.div`
  position: relative;
  z-index: 1;
`;

const WelcomeTitle = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1.5rem;
  }
`;

const WelcomeSubtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 1.5rem;
`;

const QuickStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  opacity: 0.8;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
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
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${props => props.theme.colors.gray[800]};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ViewAllLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: all 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.secondary};
    transform: translateX(2px);
  }
`;

const WorkoutCard = styled(motion.div)`
  background: linear-gradient(135deg, ${props => props.gradient[0]}, ${props => props.gradient[1]});
  border-radius: 12px;
  padding: 1.5rem;
  color: white;
  margin-bottom: 1rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transform: translate(30%, -30%);
  }
`;

const WorkoutTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const WorkoutMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
  opacity: 0.9;
`;

const WorkoutMetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ChallengeCard = styled(motion.div)`
  background: ${props => props.theme.colors.gray[50]};
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.primary}05;
    transform: translateY(-2px);
  }
`;

const ChallengeTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.gray[800]};
  margin-bottom: 0.5rem;
`;

const ChallengeProgress = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 6px;
  background: ${props => props.theme.colors.gray[200]};
  border-radius: 3px;
  overflow: hidden;
  margin-right: 0.5rem;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const ProgressText = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.gray[600]};
  font-weight: 600;
`;

const ActionButton = styled(motion.button)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  justify-content: center;
  margin-top: 1rem;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const Home = ({ user }) => {
  const [todayWorkouts] = useState([
    {
      id: 1,
      title: 'Sabah Kardiyo',
      duration: 30,
      calories: 250,
      difficulty: 'Orta',
      gradient: ['#667eea', '#764ba2']
    },
    {
      id: 2,
      title: 'Üst Vücut Güçlendirme',
      duration: 45,
      calories: 320,
      difficulty: 'Zor',
      gradient: ['#f093fb', '#f5576c']
    },
    {
      id: 3,
      title: 'Yoga & Esneklik',
      duration: 25,
      calories: 150,
      difficulty: 'Kolay',
      gradient: ['#4facfe', '#00f2fe']
    }
  ]);

  const [activeChallenges] = useState([
    {
      id: 1,
      title: '30 Günlük Kardiyo Mücadelesi',
      progress: 65,
      daysLeft: 11
    },
    {
      id: 2,
      title: 'Haftalık Kilo Hedefi',
      progress: 80,
      daysLeft: 3
    }
  ]);

  const [userStats] = useState({
    workoutsThisWeek: 5,
    caloriesBurned: 1250,
    currentStreak: user?.streak || 7,
    totalPoints: user?.points || 1250
  });

  return (
    <HomeContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <WelcomeSection
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <WelcomeContent>
          <WelcomeTitle>
            Merhaba, {user?.name || 'Sporcu'}! 👋
          </WelcomeTitle>
          <WelcomeSubtitle>
            Bugün harika bir antrenman günü! Hedeflerine ulaşmak için hazır mısın?
          </WelcomeSubtitle>
          
          <QuickStats>
            <StatCard
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <StatValue>{userStats.workoutsThisWeek}</StatValue>
              <StatLabel>Bu Hafta</StatLabel>
            </StatCard>
            <StatCard
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <StatValue>{userStats.caloriesBurned}</StatValue>
              <StatLabel>Kalori</StatLabel>
            </StatCard>
            <StatCard
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <StatValue>{userStats.currentStreak}</StatValue>
              <StatLabel>Gün Serisi</StatLabel>
            </StatCard>
            <StatCard
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <StatValue>{userStats.totalPoints}</StatValue>
              <StatLabel>Puan</StatLabel>
            </StatCard>
          </QuickStats>
        </WelcomeContent>
      </WelcomeSection>

      <GridContainer>
        <MainContent>
          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <CardHeader>
              <CardTitle>
                <FiActivity />
                Bugünün Antrenmanları
              </CardTitle>
              <ViewAllLink to="/workouts">
                Tümünü Gör <FiChevronRight size={16} />
              </ViewAllLink>
            </CardHeader>
            
            {todayWorkouts.map((workout, index) => (
              <WorkoutCard
                key={workout.id}
                gradient={workout.gradient}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <WorkoutTitle>{workout.title}</WorkoutTitle>
                <WorkoutMeta>
                  <WorkoutMetaItem>
                    <FiClock size={14} />
                    {workout.duration} dk
                  </WorkoutMetaItem>
                  <WorkoutMetaItem>
                    <FiHeart size={14} />
                    {workout.calories} kcal
                  </WorkoutMetaItem>
                  <WorkoutMetaItem>
                    <FiTarget size={14} />
                    {workout.difficulty}
                  </WorkoutMetaItem>
                </WorkoutMeta>
              </WorkoutCard>
            ))}
            
            <ActionButton
              as={Link}
              to="/ai-coach"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiZap size={20} />
              AI Koçundan Öneri Al
            </ActionButton>
          </Card>
        </MainContent>

        <Sidebar>
          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <CardHeader>
              <CardTitle>
                <FiTrendingUp />
                Aktif Mücadeleler
              </CardTitle>
              <ViewAllLink to="/challenges">
                Tümü <FiChevronRight size={16} />
              </ViewAllLink>
            </CardHeader>
            
            {activeChallenges.map((challenge, index) => (
              <ChallengeCard
                key={challenge.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <ChallengeTitle>{challenge.title}</ChallengeTitle>
                <ChallengeProgress>
                  <ProgressBar>
                    <ProgressFill progress={challenge.progress} />
                  </ProgressBar>
                  <ProgressText>{challenge.progress}%</ProgressText>
                </ChallengeProgress>
                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                  {challenge.daysLeft} gün kaldı
                </div>
              </ChallengeCard>
            ))}
            
            <ActionButton
              as={Link}
              to="/leaderboard"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiAward size={20} />
              Liderlik Tablosu
            </ActionButton>
          </Card>
        </Sidebar>
      </GridContainer>
    </HomeContainer>
  );
};

export default Home;