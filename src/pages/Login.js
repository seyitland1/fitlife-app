import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaApple } from 'react-icons/fa';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const LoginCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2);
  }
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const LogoText = styled.h1`
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 8px;
`;

const LogoSubtext = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  font-size: 14px;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  background: ${props => props.theme.colors.gray[100]};
  border-radius: 12px;
  padding: 4px;
`;

const Tab = styled.button`
  flex: 1;
  padding: 12px;
  border: none;
  background: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.gray[600]};
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.active ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none'};

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  position: relative;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.gray[400]};
  z-index: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 16px 16px 48px;
  border: 2px solid ${props => props.theme.colors.gray[200]};
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.gray[400]};
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: none;
  color: ${props => props.theme.colors.gray[400]};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;

  &:hover {
    color: ${props => props.theme.colors.gray[600]};
  }
`;

const ForgotPassword = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-size: 14px;
  text-align: right;
  margin-top: -10px;

  &:hover {
    text-decoration: underline;
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0 20px;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${props => props.theme.colors.gray[200]};
  }
  
  span {
    padding: 0 20px;
    color: ${props => props.theme.colors.gray[500]};
    font-size: 14px;
  }
`;

const SocialButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const SocialButton = styled.button`
  flex: 1;
  padding: 12px;
  border: 2px solid ${props => props.theme.colors.gray[200]};
  background: white;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;

  &:hover {
    border-color: ${props => props.theme.colors.gray[300]};
    transform: translateY(-2px);
  }
`;

const SignupPrompt = styled.p`
  text-align: center;
  margin-top: 30px;
  color: ${props => props.theme.colors.gray[600]};
  font-size: 14px;
  
  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock successful login
    const mockUser = {
      id: 1,
      name: isLogin ? 'Ahmet Yılmaz' : formData.name,
      email: formData.email,
      avatar: '/api/placeholder/100/100',
      level: 'Intermediate',
      points: 1250,
      streak: 7
    };

    onLogin(mockUser);
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} ile giriş yapılıyor...`);
    // Implement social login logic here
  };

  return (
    <LoginContainer>
      <LoginCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Logo>
          <LogoText>FitLife</LogoText>
          <LogoSubtext>Sağlıklı yaşamın dijital partneri</LogoSubtext>
        </Logo>

        <TabContainer>
          <Tab 
            active={isLogin} 
            onClick={() => setIsLogin(true)}
            type="button"
          >
            Giriş Yap
          </Tab>
          <Tab 
            active={!isLogin} 
            onClick={() => setIsLogin(false)}
            type="button"
          >
            Kayıt Ol
          </Tab>
        </TabContainer>

        <Form onSubmit={handleSubmit}>
          {!isLogin && (
            <InputGroup>
              <InputIcon>
                <FiUser size={20} />
              </InputIcon>
              <Input
                type="text"
                name="name"
                placeholder="Ad Soyad"
                value={formData.name}
                onChange={handleInputChange}
                required={!isLogin}
              />
            </InputGroup>
          )}

          <InputGroup>
            <InputIcon>
              <FiMail size={20} />
            </InputIcon>
            <Input
              type="email"
              name="email"
              placeholder="E-posta adresi"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <InputIcon>
              <FiLock size={20} />
            </InputIcon>
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Şifre"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </PasswordToggle>
          </InputGroup>

          {!isLogin && (
            <InputGroup>
              <InputIcon>
                <FiLock size={20} />
              </InputIcon>
              <Input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Şifre Tekrar"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required={!isLogin}
              />
            </InputGroup>
          )}

          {isLogin && (
            <ForgotPassword href="#">
              Şifremi unuttum
            </ForgotPassword>
          )}

          <SubmitButton
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Yükleniyor...' : (isLogin ? 'Giriş Yap' : 'Kayıt Ol')}
          </SubmitButton>
        </Form>

        <Divider>
          <span>veya</span>
        </Divider>

        <SocialButtons>
          <SocialButton onClick={() => handleSocialLogin('Google')}>
            <FcGoogle />
          </SocialButton>
          <SocialButton onClick={() => handleSocialLogin('Facebook')}>
            <FaFacebook color="#1877F2" />
          </SocialButton>
          <SocialButton onClick={() => handleSocialLogin('Apple')}>
            <FaApple color="#000" />
          </SocialButton>
        </SocialButtons>

        <SignupPrompt>
          {isLogin ? (
            <>Hesabın yok mu? <a href="#" onClick={() => setIsLogin(false)}>Kayıt ol</a></>
          ) : (
            <>Zaten hesabın var mı? <a href="#" onClick={() => setIsLogin(true)}>Giriş yap</a></>
          )}
        </SignupPrompt>
      </LoginCard>
    </LoginContainer>
  );
}

export default Login;