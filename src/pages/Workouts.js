import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch,
  FiFilter,
  FiClock,
  FiZap,
  FiTarget,
  FiPlayCircle,
  FiHeart,
  FiShare2,
  FiBookmark,
  FiTrendingUp,
  FiUsers,
  FiStar
} from 'react-icons/fi';

const WorkoutsContainer = styled(motion.div)`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${props => props.theme.colors.gray[800]};
  margin-bottom: 0.5rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.gray[600]};
  margin-bottom: 2rem;
`;

const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchBar = styled.div`
  position: relative;
  flex: 1;
  min-width: 300px;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    min-width: auto;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid ${props => props.theme.colors.gray[200]};
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  }
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.gray[400]};
  size: 20px;
`;

const FilterTabs = styled.div`
  display: flex;
  gap: 0.5rem;
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

const WorkoutGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const WorkoutCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.md};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

const WorkoutImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, ${props => props.gradient[0]}, ${props => props.gradient[1]});
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 150px;
    height: 150px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transform: translate(30%, -30%);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100px;
    height: 100px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
    transform: translate(-30%, 30%);
  }
`;

const PlayButton = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  z-index: 2;
`;

const WorkoutActions = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  z-index: 2;
`;

const ActionButton = styled(motion.button)`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const WorkoutContent = styled.div`
  padding: 1.5rem;
`;

const WorkoutTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${props => props.theme.colors.gray[800]};
  margin-bottom: 0.5rem;
`;

const WorkoutDescription = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const WorkoutMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const MetaGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.gray[600]};
  font-weight: 600;
`;

const DifficultyBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => {
    switch (props.level) {
      case 'Kolay': return '#10b98120';
      case 'Orta': return '#f59e0b20';
      case 'Zor': return '#ef444420';
      default: return '#6b728020';
    }
  }};
  color: ${props => {
    switch (props.level) {
      case 'Kolay': return '#10b981';
      case 'Orta': return '#f59e0b';
      case 'Zor': return '#ef4444';
      default: return '#6b7280';
    }
  }};
`;

const WorkoutFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.gray[200]};
`;

const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Stars = styled.div`
  display: flex;
  gap: 0.1rem;
`;

const Star = styled(FiStar)`
  color: ${props => props.filled ? '#fbbf24' : '#d1d5db'};
  fill: ${props => props.filled ? '#fbbf24' : 'none'};
  size: 14px;
`;

const RatingText = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.gray[600]};
  font-weight: 600;
`;

const ParticipantsCount = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.gray[600]};
`;

const LoadMoreButton = styled(motion.button)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin: 2rem auto;
  display: block;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const Workouts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Tümü');
  const [workouts, setWorkouts] = useState([
    {
      id: 1,
      title: 'HIIT Kardiyo Patlaması',
      description: 'Yüksek yoğunluklu interval antrenmanı ile metabolizmanızı hızlandırın.',
      duration: 30,
      calories: 350,
      difficulty: 'Zor',
      category: 'Kardiyo',
      rating: 4.8,
      participants: 1250,
      gradient: ['#667eea', '#764ba2'],
      icon: '🔥'
    },
    {
      id: 2,
      title: 'Güçlü Üst Vücut',
      description: 'Göğüs, omuz ve kol kaslarınızı güçlendiren kapsamlı antrenman.',
      duration: 45,
      calories: 280,
      difficulty: 'Orta',
      category: 'Güç',
      rating: 4.6,
      participants: 890,
      gradient: ['#f093fb', '#f5576c'],
      icon: '💪'
    },
    {
      id: 3,
      title: 'Yoga Akışı',
      description: 'Esneklik ve zihinsel dinginlik için rahatlatıcı yoga seansı.',
      duration: 60,
      calories: 200,
      difficulty: 'Kolay',
      category: 'Yoga',
      rating: 4.9,
      participants: 2100,
      gradient: ['#4facfe', '#00f2fe'],
      icon: '🧘'
    },
    {
      id: 4,
      title: 'Alt Vücut Güçlendirme',
      description: 'Bacak ve kalça kaslarınızı hedefleyen etkili egzersizler.',
      duration: 40,
      calories: 320,
      difficulty: 'Orta',
      category: 'Güç',
      rating: 4.7,
      participants: 750,
      gradient: ['#fa709a', '#fee140'],
      icon: '🦵'
    },
    {
      id: 5,
      title: 'Sabah Enerji Kardiyo',
      description: 'Güne enerjik başlamak için hafif tempolu kardiyo antrenmanı.',
      duration: 25,
      calories: 180,
      difficulty: 'Kolay',
      category: 'Kardiyo',
      rating: 4.5,
      participants: 1500,
      gradient: ['#a8edea', '#fed6e3'],
      icon: '☀️'
    },
    {
      id: 6,
      title: 'Core Stabilizasyon',
      description: 'Karın kasları ve core bölgenizi güçlendiren özel egzersizler.',
      duration: 35,
      calories: 220,
      difficulty: 'Orta',
      category: 'Core',
      rating: 4.8,
      participants: 980,
      gradient: ['#ffecd2', '#fcb69f'],
      icon: '🎯'
    }
  ]);

  const [filteredWorkouts, setFilteredWorkouts] = useState(workouts);

  const filterCategories = [
    { name: 'Tümü', icon: FiTrendingUp },
    { name: 'Kardiyo', icon: FiZap },
    { name: 'Güç', icon: FiTarget },
    { name: 'Yoga', icon: FiHeart },
    { name: 'Core', icon: FiUsers }
  ];

  useEffect(() => {
    let filtered = workouts;

    if (activeFilter !== 'Tümü') {
      filtered = filtered.filter(workout => workout.category === activeFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(workout => 
        workout.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workout.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredWorkouts(filtered);
  }, [searchTerm, activeFilter, workouts]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star key={i} filled={i < fullStars} />
      );
    }
    
    return stars;
  };

  return (
    <WorkoutsContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header>
        <Title>Antrenmanlar</Title>
        <Subtitle>
          Hedeflerinize uygun antrenmanları keşfedin ve fitness yolculuğunuzu başlatın.
        </Subtitle>
      </Header>

      <FilterSection>
        <SearchBar>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Antrenman ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>
        
        <FilterTabs>
          {filterCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <FilterTab
                key={category.name}
                active={activeFilter === category.name}
                onClick={() => setActiveFilter(category.name)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconComponent size={16} />
                {category.name}
              </FilterTab>
            );
          })}
        </FilterTabs>
      </FilterSection>

      <WorkoutGrid>
        <AnimatePresence>
          {filteredWorkouts.map((workout, index) => (
            <WorkoutCard
              key={workout.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <WorkoutImage gradient={workout.gradient}>
                <WorkoutActions>
                  <ActionButton
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiBookmark size={16} />
                  </ActionButton>
                  <ActionButton
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiShare2 size={16} />
                  </ActionButton>
                </WorkoutActions>
                
                <PlayButton
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiPlayCircle size={24} />
                </PlayButton>
                
                <div style={{ 
                  position: 'absolute', 
                  bottom: '1rem', 
                  left: '1rem',
                  fontSize: '2rem',
                  zIndex: 2
                }}>
                  {workout.icon}
                </div>
              </WorkoutImage>
              
              <WorkoutContent>
                <WorkoutTitle>{workout.title}</WorkoutTitle>
                <WorkoutDescription>{workout.description}</WorkoutDescription>
                
                <WorkoutMeta>
                  <MetaGroup>
                    <MetaItem>
                      <FiClock size={14} />
                      {workout.duration} dk
                    </MetaItem>
                    <MetaItem>
                      <FiZap size={14} />
                      {workout.calories} kcal
                    </MetaItem>
                  </MetaGroup>
                  <DifficultyBadge level={workout.difficulty}>
                    {workout.difficulty}
                  </DifficultyBadge>
                </WorkoutMeta>
                
                <WorkoutFooter>
                  <RatingSection>
                    <Stars>
                      {renderStars(workout.rating)}
                    </Stars>
                    <RatingText>{workout.rating}</RatingText>
                  </RatingSection>
                  
                  <ParticipantsCount>
                    <FiUsers size={14} />
                    {workout.participants.toLocaleString()}
                  </ParticipantsCount>
                </WorkoutFooter>
              </WorkoutContent>
            </WorkoutCard>
          ))}
        </AnimatePresence>
      </WorkoutGrid>

      {filteredWorkouts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#6b7280'
          }}
        >
          <h3>Aradığınız kriterlere uygun antrenman bulunamadı.</h3>
          <p>Farklı arama terimleri veya filtreler deneyebilirsiniz.</p>
        </motion.div>
      )}

      <LoadMoreButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Daha Fazla Antrenman Yükle
      </LoadMoreButton>
    </WorkoutsContainer>
  );
};

export default Workouts;