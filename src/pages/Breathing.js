import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiPlayCircle,
  FiPause,
  FiRotateCcw,
  FiSettings,
  FiWind,
  FiHeart,
  FiSun,
  FiMoon,
  FiActivity,
  FiClock,
  FiTarget,
  FiTrendingUp
} from 'react-icons/fi';

const BreathingContainer = styled(motion.div)`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;

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

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 3rem;
  align-items: start;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const BreathingArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 600px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 24px;
  padding: 3rem;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 50%);
  }
`;

const BreathingCircle = styled(motion.div)`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%);
  border: 3px solid rgba(255,255,255,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%);
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 150px;
    height: 150px;

    &::before {
      width: 100px;
      height: 100px;
    }
  }
`;

const BreathingIcon = styled(motion.div)`
  font-size: 3rem;
  z-index: 1;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

const PhaseText = styled(motion.h2)`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1.5rem;
  }
`;

const CountdownText = styled(motion.div)`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 2rem;
  text-align: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

const ControlsArea = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const ControlButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.5);
  background: ${props => props.primary ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.2)'};
  color: ${props => props.primary ? props.theme.colors.primary : 'white'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.primary ? 'white' : 'rgba(255,255,255,0.3)'};
    transform: scale(1.1);
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const TechniqueCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadows.md};
  border: 2px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.gray[200]};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const TechniqueHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const TechniqueIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, ${props => props.color}, ${props => props.colorSecondary});
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
`;

const TechniqueInfo = styled.div`
  flex: 1;
`;

const TechniqueName = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${props => props.theme.colors.gray[800]};
  margin-bottom: 0.25rem;
`;

const TechniqueDuration = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.gray[600]};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const TechniqueDescription = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const TechniquePattern = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.gray[500]};
  font-weight: 600;
`;

const StatsCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadows.md};
  border: 1px solid ${props => props.theme.colors.gray[200]};
`;

const StatsTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${props => props.theme.colors.gray[800]};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.gray[100]};

  &:last-child {
    border-bottom: none;
  }
`;

const StatLabel = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.gray[600]};
`;

const StatValue = styled.span`
  font-size: 1rem;
  font-weight: 700;
  color: ${props => props.theme.colors.gray[800]};
`;

const ProgressRing = styled.div`
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  border-radius: 50%;
  background: conic-gradient(
    ${props => props.theme.colors.primary} ${props => props.progress * 3.6}deg,
    rgba(255,255,255,0.3) ${props => props.progress * 3.6}deg
  );
`;

const Breathing = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentTechnique, setCurrentTechnique] = useState(0);
  const [phase, setPhase] = useState('ready'); // ready, inhale, hold, exhale
  const [countdown, setCountdown] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [progress, setProgress] = useState(0);

  const techniques = [
    {
      id: 1,
      name: '4-7-8 Tekniği',
      description: 'Rahatlatıcı ve uyku getirici nefes tekniği. Stresi azaltır.',
      pattern: '4s nefes al - 7s tut - 8s ver',
      duration: '5 dakika',
      inhale: 4,
      hold: 7,
      exhale: 8,
      cycles: 8,
      color: '#6366f1',
      colorSecondary: '#8b5cf6',
      icon: <FiMoon />
    },
    {
      id: 2,
      name: 'Kutu Nefesi',
      description: 'Odaklanmayı artırır ve zihinsel netlik sağlar.',
      pattern: '4s nefes al - 4s tut - 4s ver - 4s bekle',
      duration: '8 dakika',
      inhale: 4,
      hold: 4,
      exhale: 4,
      pause: 4,
      cycles: 12,
      color: '#10b981',
      colorSecondary: '#34d399',
      icon: <FiTarget />
    },
    {
      id: 3,
      name: 'Enerji Nefesi',
      description: 'Enerji seviyesini artırır ve uyanıklığı destekler.',
      pattern: '3s nefes al - 1s tut - 2s ver',
      duration: '3 dakika',
      inhale: 3,
      hold: 1,
      exhale: 2,
      cycles: 15,
      color: '#f59e0b',
      colorSecondary: '#fbbf24',
      icon: <FiSun />
    },
    {
      id: 4,
      name: 'Kalp Ritmi',
      description: 'Kalp ritmini düzenler ve kan basıncını dengeleyebilir.',
      pattern: '5s nefes al - 5s ver',
      duration: '10 dakika',
      inhale: 5,
      hold: 0,
      exhale: 5,
      cycles: 20,
      color: '#ef4444',
      colorSecondary: '#f87171',
      icon: <FiHeart />
    }
  ];

  const currentTech = techniques[currentTechnique];

  useEffect(() => {
    let interval;
    if (isActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (isActive && countdown === 0) {
      // Move to next phase
      if (phase === 'inhale') {
        if (currentTech.hold > 0) {
          setPhase('hold');
          setCountdown(currentTech.hold);
        } else {
          setPhase('exhale');
          setCountdown(currentTech.exhale);
        }
      } else if (phase === 'hold') {
        setPhase('exhale');
        setCountdown(currentTech.exhale);
      } else if (phase === 'exhale') {
        if (currentTech.pause) {
          setPhase('pause');
          setCountdown(currentTech.pause);
        } else {
          setCycleCount(prev => prev + 1);
          if (cycleCount + 1 >= currentTech.cycles) {
            setIsActive(false);
            setPhase('complete');
          } else {
            setPhase('inhale');
            setCountdown(currentTech.inhale);
          }
        }
      } else if (phase === 'pause') {
        setCycleCount(prev => prev + 1);
        if (cycleCount + 1 >= currentTech.cycles) {
          setIsActive(false);
          setPhase('complete');
        } else {
          setPhase('inhale');
          setCountdown(currentTech.inhale);
        }
      }
    }

    return () => clearInterval(interval);
  }, [isActive, countdown, phase, currentTech, cycleCount]);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTotalTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (currentTech) {
      const totalCycleTime = currentTech.inhale + (currentTech.hold || 0) + currentTech.exhale + (currentTech.pause || 0);
      const totalSessionTime = totalCycleTime * currentTech.cycles;
      const currentProgress = ((cycleCount * totalCycleTime) + (totalCycleTime - getCurrentPhaseTime())) / totalSessionTime * 100;
      setProgress(Math.min(currentProgress, 100));
    }
  }, [cycleCount, phase, countdown, currentTech]);

  const getCurrentPhaseTime = () => {
    switch (phase) {
      case 'inhale': return currentTech.inhale - countdown;
      case 'hold': return currentTech.inhale + (currentTech.hold - countdown);
      case 'exhale': return currentTech.inhale + (currentTech.hold || 0) + (currentTech.exhale - countdown);
      case 'pause': return currentTech.inhale + (currentTech.hold || 0) + currentTech.exhale + (currentTech.pause - countdown);
      default: return 0;
    }
  };

  const startBreathing = () => {
    setIsActive(true);
    setPhase('inhale');
    setCountdown(currentTech.inhale);
    setCycleCount(0);
    setTotalTime(0);
    setProgress(0);
  };

  const pauseBreathing = () => {
    setIsActive(false);
  };

  const resetBreathing = () => {
    setIsActive(false);
    setPhase('ready');
    setCountdown(0);
    setCycleCount(0);
    setTotalTime(0);
    setProgress(0);
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'ready': return 'Başlamaya Hazır';
      case 'inhale': return 'Nefes Al';
      case 'hold': return 'Tut';
      case 'exhale': return 'Nefes Ver';
      case 'pause': return 'Bekle';
      case 'complete': return 'Tamamlandı!';
      default: return '';
    }
  };

  const getCircleScale = () => {
    switch (phase) {
      case 'inhale': return 1.3;
      case 'hold': return 1.3;
      case 'exhale': return 0.8;
      case 'pause': return 0.8;
      default: return 1;
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <BreathingContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header>
        <Title>
          <FiWind />
          Nefes Egzersizleri
        </Title>
        <Subtitle>
          Doğru nefes teknikleri ile zihinsel ve fiziksel sağlığınızı destekleyin.
        </Subtitle>
      </Header>

      <MainContent>
        <BreathingArea>
          <BreathingCircle
            animate={{ scale: getCircleScale() }}
            transition={{ duration: countdown > 0 ? countdown : 2, ease: "easeInOut" }}
          >
            <ProgressRing progress={progress} />
            <BreathingIcon
              animate={{ rotate: isActive ? 360 : 0 }}
              transition={{ duration: 8, repeat: isActive ? Infinity : 0, ease: "linear" }}
            >
              <FiWind />
            </BreathingIcon>
          </BreathingCircle>

          <PhaseText
            key={phase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {getPhaseText()}
          </PhaseText>

          <AnimatePresence>
            {countdown > 0 && (
              <CountdownText
                key={countdown}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {countdown}
              </CountdownText>
            )}
          </AnimatePresence>

          {phase === 'ready' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: 'center', marginBottom: '2rem' }}
            >
              <h3 style={{ marginBottom: '1rem' }}>{currentTech.name}</h3>
              <p style={{ opacity: 0.8 }}>{currentTech.pattern}</p>
            </motion.div>
          )}

          {(phase !== 'ready' && phase !== 'complete') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: 'center', marginBottom: '2rem' }}
            >
              <p style={{ opacity: 0.8 }}>Döngü: {cycleCount + 1} / {currentTech.cycles}</p>
            </motion.div>
          )}

          <ControlsArea>
            {!isActive && phase !== 'complete' && (
              <ControlButton
                primary
                onClick={startBreathing}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiPlayCircle size={24} />
              </ControlButton>
            )}

            {isActive && (
              <ControlButton
                primary
                onClick={pauseBreathing}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiPause size={24} />
              </ControlButton>
            )}

            <ControlButton
              onClick={resetBreathing}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiRotateCcw size={20} />
            </ControlButton>

            <ControlButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiSettings size={20} />
            </ControlButton>
          </ControlsArea>
        </BreathingArea>

        <Sidebar>
          <div>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '700' }}>Nefes Teknikleri</h3>
            {techniques.map((technique, index) => (
              <TechniqueCard
                key={technique.id}
                active={currentTechnique === index}
                onClick={() => {
                  setCurrentTechnique(index);
                  resetBreathing();
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <TechniqueHeader>
                  <TechniqueIcon color={technique.color} colorSecondary={technique.colorSecondary}>
                    {technique.icon}
                  </TechniqueIcon>
                  <TechniqueInfo>
                    <TechniqueName>{technique.name}</TechniqueName>
                    <TechniqueDuration>
                      <FiClock size={14} />
                      {technique.duration}
                    </TechniqueDuration>
                  </TechniqueInfo>
                </TechniqueHeader>
                <TechniqueDescription>{technique.description}</TechniqueDescription>
                <TechniquePattern>{technique.pattern}</TechniquePattern>
              </TechniqueCard>
            ))}
          </div>

          <StatsCard>
            <StatsTitle>
              <FiTrendingUp />
              Bu Seans
            </StatsTitle>
            <StatItem>
              <StatLabel>Süre</StatLabel>
              <StatValue>{formatTime(totalTime)}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Tamamlanan Döngü</StatLabel>
              <StatValue>{cycleCount}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>İlerleme</StatLabel>
              <StatValue>%{Math.round(progress)}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Teknik</StatLabel>
              <StatValue>{currentTech.name}</StatValue>
            </StatItem>
          </StatsCard>
        </Sidebar>
      </MainContent>
    </BreathingContainer>
  );
};

export default Breathing;