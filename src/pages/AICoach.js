import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSend,
  FiMic,
  FiMicOff,
  FiUser,
  FiBot,
  FiTarget,
  FiTrendingUp,
  FiActivity,
  FiHeart,
  FiZap,
  FiClock,
  FiAward,
  FiRefreshCw
} from 'react-icons/fi';

const AICoachContainer = styled(motion.div)`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 1rem;
    height: calc(100vh - 100px);
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
  margin-bottom: 1rem;
`;

const AIStatus = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 20px;
  box-shadow: ${props => props.theme.shadows.lg};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  overflow: hidden;
`;

const MessagesArea = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: ${props => props.theme.colors.gray[50]};

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.gray[100]};
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.gray[300]};
    border-radius: 3px;
  }
`;

const Message = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  ${props => props.isUser ? 'flex-direction: row-reverse;' : ''}
`;

const MessageAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  flex-shrink: 0;
  background: ${props => props.isUser 
    ? `linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.secondary})`
    : `linear-gradient(135deg, #667eea, #764ba2)`
  };
`;

const MessageBubble = styled(motion.div)`
  max-width: 70%;
  padding: 1rem 1.25rem;
  border-radius: 18px;
  background: ${props => props.isUser ? props.theme.colors.primary : 'white'};
  color: ${props => props.isUser ? 'white' : props.theme.colors.gray[800]};
  box-shadow: ${props => props.theme.shadows.sm};
  position: relative;
  line-height: 1.5;

  ${props => props.isUser ? `
    border-bottom-right-radius: 6px;
  ` : `
    border-bottom-left-radius: 6px;
  `}
`;

const MessageTime = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.gray[500]};
  margin-top: 0.25rem;
  ${props => props.isUser ? 'text-align: right;' : ''}
`;

const TypingIndicator = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 0;
`;

const TypingDots = styled.div`
  display: flex;
  gap: 0.25rem;
  padding: 1rem 1.25rem;
  background: white;
  border-radius: 18px;
  border-bottom-left-radius: 6px;
  box-shadow: ${props => props.theme.shadows.sm};
`;

const Dot = styled(motion.div)`
  width: 8px;
  height: 8px;
  background: ${props => props.theme.colors.gray[400]};
  border-radius: 50%;
`;

const InputArea = styled.div`
  padding: 1.5rem;
  background: white;
  border-top: 1px solid ${props => props.theme.colors.gray[200]};
`;

const InputContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-end;
`;

const InputWrapper = styled.div`
  flex: 1;
  position: relative;
`;

const MessageInput = styled.textarea`
  width: 100%;
  min-height: 50px;
  max-height: 120px;
  padding: 1rem 3.5rem 1rem 1rem;
  border: 2px solid ${props => props.theme.colors.gray[200]};
  border-radius: 25px;
  font-size: 1rem;
  font-family: inherit;
  resize: none;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  }

  &::placeholder {
    color: ${props => props.theme.colors.gray[400]};
  }
`;

const VoiceButton = styled(motion.button)`
  position: absolute;
  right: 0.75rem;
  bottom: 0.75rem;
  width: 36px;
  height: 36px;
  border: none;
  background: ${props => props.isRecording ? '#ef4444' : props.theme.colors.gray[300]};
  color: ${props => props.isRecording ? 'white' : props.theme.colors.gray[600]};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.isRecording ? '#dc2626' : props.theme.colors.gray[400]};
  }
`;

const SendButton = styled(motion.button)`
  width: 50px;
  height: 50px;
  border: none;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const QuickActions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const QuickActionButton = styled(motion.button)`
  padding: 0.75rem 1rem;
  border: 2px solid ${props => props.theme.colors.primary};
  background: white;
  color: ${props => props.theme.colors.primary};
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    transform: translateY(-1px);
  }
`;

const AICoach = ({ user }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Merhaba ${user?.name || 'Sporcu'}! Ben senin kişisel AI koçunum. Fitness hedeflerin, antrenman planların ve beslenme konularında sana yardımcı olmak için buradayım. Nasıl yardımcı olabilirim?`,
      isUser: false,
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const quickActions = [
    { text: 'Antrenman planı oluştur', icon: FiTarget },
    { text: 'Beslenme önerisi', icon: FiHeart },
    { text: 'İlerleme analizi', icon: FiTrendingUp },
    { text: 'Motivasyon desteği', icon: FiZap },
    { text: 'Egzersiz önerisi', icon: FiActivity },
    { text: 'Hedef belirleme', icon: FiAward }
  ];

  const aiResponses = {
    'antrenman': [
      'Harika! Senin için kişiselleştirilmiş bir antrenman planı hazırlayabilirim. Hangi kas gruplarına odaklanmak istiyorsun?',
      'Mevcut fitness seviyene göre 4 haftalık bir antrenman programı önerebilirim. Haftada kaç gün antrenman yapmayı planlıyorsun?',
      'Hedeflerine uygun HIIT, güç antrenmanı veya kardiyo ağırlıklı programlar arasından seçim yapabiliriz.'
    ],
    'beslenme': [
      'Beslenme konusunda sana yardımcı olmaktan mutluluk duyarım! Günlük kalori hedefin nedir?',
      'Sağlıklı beslenme planı için öncelikle hedeflerini öğrenmek istiyorum. Kilo vermek, almak veya korumak mı istiyorsun?',
      'Protein, karbonhidrat ve yağ oranlarını optimize ederek metabolizmanı hızlandırabiliriz.'
    ],
    'motivasyon': [
      'Sen harikasın! Şimdiye kadar kat ettiğin mesafeye bak. Her gün biraz daha güçleniyorsun! 💪',
      'Unutma, en büyük rakibin dünkü halsin. Bugün kendini geçmeye odaklan!',
      'Zorlu günler seni daha güçlü yapıyor. Bu süreçte yanındayım, birlikte başaracağız!'
    ],
    'hedef': [
      'Hedef belirleme konusunda sana rehberlik edebilirim. SMART hedefler (Spesifik, Ölçülebilir, Ulaşılabilir, Gerçekçi, Zamanlı) oluşturalım.',
      'Kısa vadeli ve uzun vadeli hedeflerini dengeli bir şekilde planlayabiliriz. Ne tür hedeflerin var?',
      'Hedeflerini küçük adımlara bölerek daha kolay ulaşılabilir hale getirebiliriz.'
    ],
    'default': [
      'Bu konuda sana yardımcı olmaya çalışayım. Daha spesifik olabilir misin?',
      'İlginç bir soru! Bu konuda daha detaylı bilgi verebilir misin?',
      'Sana en iyi şekilde yardımcı olabilmek için biraz daha açıklayabilir misin?'
    ]
  };

  const getAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    let responseCategory = 'default';

    if (message.includes('antrenman') || message.includes('egzersiz') || message.includes('spor')) {
      responseCategory = 'antrenman';
    } else if (message.includes('beslenme') || message.includes('diyet') || message.includes('kalori')) {
      responseCategory = 'beslenme';
    } else if (message.includes('motivasyon') || message.includes('moral') || message.includes('destek')) {
      responseCategory = 'motivasyon';
    } else if (message.includes('hedef') || message.includes('plan') || message.includes('amaç')) {
      responseCategory = 'hedef';
    }

    const responses = aiResponses[responseCategory];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: getAIResponse(inputValue),
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleQuickAction = (actionText) => {
    setInputValue(actionText);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Here you would implement actual voice recording functionality
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('tr-TR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <AICoachContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header>
        <Title>
          <FiZap />
          AI Koç
        </Title>
        <Subtitle>
          Kişiselleştirilmiş fitness rehberliği için yapay zeka destekli koçunuz
        </Subtitle>
        <AIStatus
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FiZap size={16} />
          Aktif ve Hazır
        </AIStatus>
      </Header>

      <ChatContainer>
        <MessagesArea>
          <AnimatePresence>
            {messages.map((message) => (
              <Message
                key={message.id}
                isUser={message.isUser}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <MessageAvatar isUser={message.isUser}>
                  {message.isUser ? <FiUser /> : <FiZap />}
                </MessageAvatar>
                <div>
                  <MessageBubble
                    isUser={message.isUser}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {message.text}
                  </MessageBubble>
                  <MessageTime isUser={message.isUser}>
                    {formatTime(message.timestamp)}
                  </MessageTime>
                </div>
              </Message>
            ))}
          </AnimatePresence>

          {isTyping && (
            <TypingIndicator
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <MessageAvatar isUser={false}>
                <FiZap />
              </MessageAvatar>
              <TypingDots>
                {[0, 1, 2].map((i) => (
                  <Dot
                    key={i}
                    animate={{ y: [-2, -8, -2] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </TypingDots>
            </TypingIndicator>
          )}
        </MessagesArea>

        <InputArea>
          <QuickActions>
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <QuickActionButton
                  key={index}
                  onClick={() => handleQuickAction(action.text)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent size={16} />
                  {action.text}
                </QuickActionButton>
              );
            })}
          </QuickActions>

          <InputContainer>
            <InputWrapper>
              <MessageInput
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="AI koçuna bir mesaj yaz..."
                rows={1}
              />
              <VoiceButton
                isRecording={isRecording}
                onClick={toggleRecording}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiMic size={16} />
              </VoiceButton>
            </InputWrapper>
            
            <SendButton
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiSend size={20} />
            </SendButton>
          </InputContainer>
        </InputArea>
      </ChatContainer>
    </AICoachContainer>
  );
};

export default AICoach;