import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  FiPlayCircle,
  FiPause,
  FiSkipBack,
  FiSkipForward,
  FiVolume2,
  FiHeart,
  FiClock,
  FiUser,
  FiStar,
  FiHeadphones,
  FiSun,
  FiMoon,
  FiCloud,
  FiWind
} from 'react-icons/fi';

const MeditationContainer = styled(motion.div)`
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
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const MeditationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const MeditationCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.lg};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

const MeditationImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, ${props => props.color || props.theme.colors.primary}, ${props => props.colorSecondary || props.theme.colors.secondary});
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

const PlayButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(10px);
  opacity: 0;
  transition: all 0.3s ease;

  ${MeditationCard}:hover & {
    opacity: 1;
  }
`;

const FavoriteButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: ${props => props.favorited ? '#ef4444' : props.theme.colors.gray[600]};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(10px);
`;

const MeditationInfo = styled.div`
  padding: 1.5rem;
`;

const MeditationCategory = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.gray[500]};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
`;

const MeditationTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${props => props.theme.colors.gray[800]};
  margin-bottom: 0.5rem;
  line-height: 1.3;
`;

const MeditationDescription = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const MeditationMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.gray[500]};
  font-weight: 600;
`;

const MeditationRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Stars = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const Star = styled(FiStar)`
  color: ${props => props.filled ? '#fbbf24' : props.theme.colors.gray[300]};
  fill: ${props => props.filled ? '#fbbf24' : 'none'};
`;

const RatingText = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.gray[600]};
  font-weight: 600;
`;

const PlayerContainer = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadows.xl};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  min-width: 400px;
  z-index: 1000;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    left: 1rem;
    right: 1rem;
    transform: none;
    min-width: auto;
  }
`;

const PlayerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const PlayerImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: linear-gradient(135deg, ${props => props.color}, ${props => props.colorSecondary});
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
`;

const PlayerInfo = styled.div`
  flex: 1;
`;

const PlayerTitle = styled.h4`
  font-size: 1rem;
  font-weight: 700;
  color: ${props => props.theme.colors.gray[800]};
  margin-bottom: 0.25rem;
`;

const PlayerInstructor = styled.p`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.gray[600]};
`;

const PlayerControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ControlButton = styled(motion.button)`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: ${props => props.primary ? props.theme.colors.primary : props.theme.colors.gray[100]};
  color: ${props => props.primary ? 'white' : props.theme.colors.gray[600]};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ProgressContainer = styled.div`
  margin-bottom: 1rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: ${props => props.theme.colors.gray[200]};
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const Progress = styled.div`
  height: 100%;
  background: ${props => props.theme.colors.primary};
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const TimeDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.gray[600]};
  font-weight: 600;
`;

const VolumeControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const VolumeSlider = styled.input`
  flex: 1;
  height: 4px;
  background: ${props => props.theme.colors.gray[200]};
  border-radius: 2px;
  outline: none;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${props => props.theme.colors.primary};
    cursor: pointer;
  }
`;

const Meditation = () => {
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const [favorites, setFavorites] = useState(new Set());
  const [currentMeditation, setCurrentMeditation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);

  const categories = [
    { name: 'Tümü', icon: <FiHeadphones /> },
    { name: 'Uyku', icon: <FiMoon /> },
    { name: 'Stres', icon: <FiCloud /> },
    { name: 'Odaklanma', icon: <FiSun /> },
    { name: 'Nefes', icon: <FiWind /> }
  ];

  const meditations = [
    {
      id: 1,
      title: 'Derin Uyku Meditasyonu',
      category: 'Uyku',
      instructor: 'Dr. Ayşe Kaya',
      description: 'Rahatlatıcı sesler eşliğinde derin bir uykuya dalmanızı sağlayan meditasyon.',
      duration: '20 dk',
      rating: 4.9,
      reviews: 234,
      color: '#6366f1',
      colorSecondary: '#8b5cf6',
      icon: <FiMoon />
    },
    {
      id: 2,
      title: 'Stres Azaltma Seansı',
      category: 'Stres',
      instructor: 'Mehmet Özkan',
      description: 'Günlük stresi azaltmak ve zihinsel dengeyi sağlamak için özel tasarlanmış.',
      duration: '15 dk',
      rating: 4.8,
      reviews: 189,
      color: '#10b981',
      colorSecondary: '#34d399',
      icon: <FiCloud />
    },
    {
      id: 3,
      title: 'Odaklanma Artırıcı',
      category: 'Odaklanma',
      instructor: 'Zeynep Demir',
      description: 'Çalışma ve günlük aktiviteler için konsantrasyonu artıran meditasyon.',
      duration: '10 dk',
      rating: 4.7,
      reviews: 156,
      color: '#f59e0b',
      colorSecondary: '#fbbf24',
      icon: <FiSun />
    },
    {
      id: 4,
      title: 'Nefes Farkındalığı',
      category: 'Nefes',
      instructor: 'Ali Yılmaz',
      description: 'Nefes tekniklerini öğrenerek iç huzuru bulmanızı sağlayan rehberli seans.',
      duration: '12 dk',
      rating: 4.6,
      reviews: 98,
      color: '#06b6d4',
      colorSecondary: '#22d3ee',
      icon: <FiWind />
    },
    {
      id: 5,
      title: 'Sabah Enerjisi',
      category: 'Odaklanma',
      instructor: 'Fatma Şen',
      description: 'Güne pozitif enerji ile başlamanızı sağlayan motivasyonel meditasyon.',
      duration: '8 dk',
      rating: 4.8,
      reviews: 145,
      color: '#ef4444',
      colorSecondary: '#f87171',
      icon: <FiSun />
    },
    {
      id: 6,
      title: 'Gece Rahatlama',
      category: 'Uyku',
      instructor: 'Hasan Kılıç',
      description: 'Günün yorgunluğunu atarak rahat bir gece geçirmenizi sağlar.',
      duration: '25 dk',
      rating: 4.9,
      reviews: 267,
      color: '#8b5cf6',
      colorSecondary: '#a78bfa',
      icon: <FiMoon />
    }
  ];

  const filteredMeditations = meditations.filter(meditation => {
    return activeCategory === 'Tümü' || meditation.category === activeCategory;
  });

  const toggleFavorite = (meditationId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(meditationId)) {
        newFavorites.delete(meditationId);
      } else {
        newFavorites.add(meditationId);
      }
      return newFavorites;
    });
  };

  const playMeditation = (meditation) => {
    setCurrentMeditation(meditation);
    setIsPlaying(true);
    setProgress(0);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} filled={index < Math.floor(rating)} size={12} />
    ));
  };

  // Simulate progress
  useEffect(() => {
    let interval;
    if (isPlaying && currentMeditation) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentMeditation]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <MeditationContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header>
        <Title>
          <FiHeadphones />
          Meditasyon
        </Title>
        <Subtitle>
          Zihinsel sağlığınızı güçlendirin ve iç huzurunuzu bulun.
        </Subtitle>
      </Header>

      <CategoryTabs>
        {categories.map((category) => (
          <CategoryTab
            key={category.name}
            active={activeCategory === category.name}
            onClick={() => setActiveCategory(category.name)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.icon}
            {category.name}
          </CategoryTab>
        ))}
      </CategoryTabs>

      <MeditationGrid>
        {filteredMeditations.map((meditation, index) => (
          <MeditationCard
            key={meditation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => playMeditation(meditation)}
          >
            <MeditationImage color={meditation.color} colorSecondary={meditation.colorSecondary}>
              {meditation.icon}
              <PlayButton
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiPlayCircle size={24} />
              </PlayButton>
              <FavoriteButton
                favorited={favorites.has(meditation.id)}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(meditation.id);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiHeart size={18} />
              </FavoriteButton>
            </MeditationImage>
            
            <MeditationInfo>
              <MeditationCategory>{meditation.category}</MeditationCategory>
              <MeditationTitle>{meditation.title}</MeditationTitle>
              <MeditationDescription>{meditation.description}</MeditationDescription>
              
              <MeditationMeta>
                <MetaItem>
                  <FiClock size={14} />
                  {meditation.duration}
                </MetaItem>
                <MetaItem>
                  <FiUser size={14} />
                  {meditation.instructor}
                </MetaItem>
              </MeditationMeta>
              
              <MeditationRating>
                <Stars>{renderStars(meditation.rating)}</Stars>
                <RatingText>{meditation.rating} ({meditation.reviews})</RatingText>
              </MeditationRating>
            </MeditationInfo>
          </MeditationCard>
        ))}
      </MeditationGrid>

      {currentMeditation && (
        <PlayerContainer
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <PlayerHeader>
            <PlayerImage color={currentMeditation.color} colorSecondary={currentMeditation.colorSecondary}>
              {currentMeditation.icon}
            </PlayerImage>
            <PlayerInfo>
              <PlayerTitle>{currentMeditation.title}</PlayerTitle>
              <PlayerInstructor>{currentMeditation.instructor}</PlayerInstructor>
            </PlayerInfo>
          </PlayerHeader>

          <PlayerControls>
            <ControlButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <FiSkipBack size={20} />
            </ControlButton>
            <ControlButton 
              primary 
              onClick={togglePlayPause}
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }}
            >
              {isPlaying ? <FiPause size={24} /> : <FiPlayCircle size={24} />}
            </ControlButton>
            <ControlButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <FiSkipForward size={20} />
            </ControlButton>
          </PlayerControls>

          <ProgressContainer>
            <ProgressBar>
              <Progress progress={progress} />
            </ProgressBar>
            <TimeDisplay>
              <span>{formatTime(Math.floor(progress * 12))}</span>
              <span>{currentMeditation.duration}</span>
            </TimeDisplay>
          </ProgressContainer>

          <VolumeControl>
            <FiVolume2 size={16} color="#6b7280" />
            <VolumeSlider
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
            />
          </VolumeControl>
        </PlayerContainer>
      )}
    </MeditationContainer>
  );
};

export default Meditation;