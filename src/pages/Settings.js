import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  FiSettings,
  FiUser,
  FiBell,
  FiShield,
  FiGlobe,
  FiMoon,
  FiSun,
  FiVolume2,
  FiVolumeX,
  FiSmartphone,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiTrash2,
  FiDownload,
  FiUpload,
  FiHelpCircle,
  FiLogOut,
  FiChevronRight,
  FiToggleLeft,
  FiToggleRight,
  FiSave,
  FiX
} from 'react-icons/fi';

const SettingsContainer = styled(motion.div)`
  padding: 2rem;
  max-width: 1000px;
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
`;

const SettingsGrid = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const SettingsSection = styled(motion.div)`
  background: white;
  border-radius: 16px;
  box-shadow: ${props => props.theme.shadows.md};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  overflow: hidden;
`;

const SectionHeader = styled.div`
  padding: 1.5rem;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
`;

const SectionContent = styled.div`
  padding: 0;
`;

const SettingItem = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.gray[100]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};

  &:hover {
    background: ${props => props.clickable ? props.theme.colors.gray[50] : 'transparent'};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const SettingInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
`;

const SettingIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.color || props.theme.colors.gray[100]};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color ? 'white' : props.theme.colors.gray[600]};
  flex-shrink: 0;
`;

const SettingDetails = styled.div`
  flex: 1;
`;

const SettingLabel = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.gray[800]};
  margin-bottom: 0.25rem;
`;

const SettingDescription = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.gray[600]};
`;

const SettingControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Toggle = styled(motion.button)`
  width: 50px;
  height: 28px;
  border-radius: 14px;
  border: none;
  background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.gray[300]};
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.active ? '24px' : '2px'};
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: white;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const Select = styled.select`
  padding: 0.5rem 1rem;
  border: 2px solid ${props => props.theme.colors.gray[200]};
  border-radius: 8px;
  background: white;
  color: ${props => props.theme.colors.gray[700]};
  font-size: 0.9rem;
  cursor: pointer;
  min-width: 120px;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Input = styled.input`
  padding: 0.5rem 1rem;
  border: 2px solid ${props => props.theme.colors.gray[200]};
  border-radius: 8px;
  background: white;
  color: ${props => props.theme.colors.gray[700]};
  font-size: 0.9rem;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Button = styled(motion.button)`
  padding: 0.5rem 1rem;
  border: 2px solid ${props => {
    switch (props.variant) {
      case 'danger': return '#ef4444';
      case 'success': return '#10b981';
      default: return props.theme.colors.primary;
    }
  }};
  background: ${props => {
    switch (props.variant) {
      case 'danger': return '#ef4444';
      case 'success': return '#10b981';
      default: return props.theme.colors.primary;
    }
  }};
  color: white;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

const ChevronIcon = styled(FiChevronRight)`
  color: ${props => props.theme.colors.gray[400]};
  transition: transform 0.2s ease;
`;

const DangerZone = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: #fef2f2;
  border: 2px solid #fecaca;
  border-radius: 16px;
`;

const DangerTitle = styled.h3`
  color: #dc2626;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DangerActions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const SaveBar = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 1rem 2rem;
  border-radius: 16px;
  box-shadow: ${props => props.theme.shadows.xl};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 1000;
`;

const SaveMessage = styled.div`
  color: ${props => props.theme.colors.gray[700]};
  font-weight: 600;
`;

const Settings = ({ user }) => {
  const [settings, setSettings] = useState({
    // Profil Ayarları
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    
    // Bildirim Ayarları
    pushNotifications: true,
    emailNotifications: true,
    workoutReminders: true,
    achievementNotifications: true,
    socialNotifications: false,
    
    // Gizlilik Ayarları
    dataSharing: false,
    analyticsTracking: true,
    locationSharing: false,
    
    // Uygulama Ayarları
    theme: 'light',
    language: 'tr',
    soundEffects: true,
    hapticFeedback: true,
    autoSync: true,
    
    // Güvenlik Ayarları
    twoFactorAuth: false,
    biometricLogin: false,
    sessionTimeout: '30'
  });
  
  const [hasChanges, setHasChanges] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const saveSettings = () => {
    // Ayarları kaydet
    console.log('Ayarlar kaydedildi:', settings);
    setHasChanges(false);
  };

  const resetSettings = () => {
    // Ayarları sıfırla
    setHasChanges(false);
  };

  return (
    <SettingsContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header>
        <Title>
          <FiSettings />
          Ayarlar
        </Title>
        <Subtitle>
          Uygulama tercihlerinizi ve hesap ayarlarınızı yönetin.
        </Subtitle>
      </Header>

      <SettingsGrid>
        {/* Profil Ayarları */}
        <SettingsSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <SectionHeader>
            <FiUser size={20} />
            <SectionTitle>Profil Ayarları</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <SettingItem>
              <SettingInfo>
                <SettingIcon color="#8b5cf6">
                  <FiGlobe size={18} />
                </SettingIcon>
                <SettingDetails>
                  <SettingLabel>Profil Görünürlüğü</SettingLabel>
                  <SettingDescription>Profilinizi kimler görebilir</SettingDescription>
                </SettingDetails>
              </SettingInfo>
              <SettingControl>
                <Select 
                  value={settings.profileVisibility}
                  onChange={(e) => updateSetting('profileVisibility', e.target.value)}
                >
                  <option value="public">Herkese Açık</option>
                  <option value="friends">Sadece Arkadaşlar</option>
                  <option value="private">Gizli</option>
                </Select>
              </SettingControl>
            </SettingItem>
            
            <SettingItem>
              <SettingInfo>
                <SettingIcon color="#10b981">
                  <FiMail size={18} />
                </SettingIcon>
                <SettingDetails>
                  <SettingLabel>E-posta Göster</SettingLabel>
                  <SettingDescription>E-posta adresinizi profilinizde göster</SettingDescription>
                </SettingDetails>
              </SettingInfo>
              <SettingControl>
                <Toggle 
                  active={settings.showEmail}
                  onClick={() => updateSetting('showEmail', !settings.showEmail)}
                />
              </SettingControl>
            </SettingItem>
            
            <SettingItem>
              <SettingInfo>
                <SettingIcon color="#f59e0b">
                  <FiSmartphone size={18} />
                </SettingIcon>
                <SettingDetails>
                  <SettingLabel>Telefon Göster</SettingLabel>
                  <SettingDescription>Telefon numaranızı profilinizde göster</SettingDescription>
                </SettingDetails>
              </SettingInfo>
              <SettingControl>
                <Toggle 
                  active={settings.showPhone}
                  onClick={() => updateSetting('showPhone', !settings.showPhone)}
                />
              </SettingControl>
            </SettingItem>
          </SectionContent>
        </SettingsSection>

        {/* Bildirim Ayarları */}
        <SettingsSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SectionHeader>
            <FiBell size={20} />
            <SectionTitle>Bildirim Ayarları</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <SettingItem>
              <SettingInfo>
                <SettingIcon color="#ef4444">
                  <FiBell size={18} />
                </SettingIcon>
                <SettingDetails>
                  <SettingLabel>Push Bildirimleri</SettingLabel>
                  <SettingDescription>Anlık bildirimler al</SettingDescription>
                </SettingDetails>
              </SettingInfo>
              <SettingControl>
                <Toggle 
                  active={settings.pushNotifications}
                  onClick={() => updateSetting('pushNotifications', !settings.pushNotifications)}
                />
              </SettingControl>
            </SettingItem>
            
            <SettingItem>
              <SettingInfo>
                <SettingIcon color="#3b82f6">
                  <FiMail size={18} />
                </SettingIcon>
                <SettingDetails>
                  <SettingLabel>E-posta Bildirimleri</SettingLabel>
                  <SettingDescription>E-posta ile bildirim al</SettingDescription>
                </SettingDetails>
              </SettingInfo>
              <SettingControl>
                <Toggle 
                  active={settings.emailNotifications}
                  onClick={() => updateSetting('emailNotifications', !settings.emailNotifications)}
                />
              </SettingControl>
            </SettingItem>
            
            <SettingItem>
              <SettingInfo>
                <SettingIcon color="#10b981">
                  <FiBell size={18} />
                </SettingIcon>
                <SettingDetails>
                  <SettingLabel>Antrenman Hatırlatıcıları</SettingLabel>
                  <SettingDescription>Antrenman zamanı geldiğinde hatırlat</SettingDescription>
                </SettingDetails>
              </SettingInfo>
              <SettingControl>
                <Toggle 
                  active={settings.workoutReminders}
                  onClick={() => updateSetting('workoutReminders', !settings.workoutReminders)}
                />
              </SettingControl>
            </SettingItem>
            
            <SettingItem>
              <SettingInfo>
                <SettingIcon color="#ffd700">
                  <FiBell size={18} />
                </SettingIcon>
                <SettingDetails>
                  <SettingLabel>Başarı Bildirimleri</SettingLabel>
                  <SettingDescription>Yeni başarılar için bildirim al</SettingDescription>
                </SettingDetails>
              </SettingInfo>
              <SettingControl>
                <Toggle 
                  active={settings.achievementNotifications}
                  onClick={() => updateSetting('achievementNotifications', !settings.achievementNotifications)}
                />
              </SettingControl>
            </SettingItem>
          </SectionContent>
        </SettingsSection>

        {/* Gizlilik Ayarları */}
        <SettingsSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <SectionHeader>
            <FiShield size={20} />
            <SectionTitle>Gizlilik Ayarları</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <SettingItem>
              <SettingInfo>
                <SettingIcon color="#8b5cf6">
                  <FiShield size={18} />
                </SettingIcon>
                <SettingDetails>
                  <SettingLabel>Veri Paylaşımı</SettingLabel>
                  <SettingDescription>Anonim kullanım verilerini paylaş</SettingDescription>
                </SettingDetails>
              </SettingInfo>
              <SettingControl>
                <Toggle 
                  active={settings.dataSharing}
                  onClick={() => updateSetting('dataSharing', !settings.dataSharing)}
                />
              </SettingControl>
            </SettingItem>
            
            <SettingItem>
              <SettingInfo>
                <SettingIcon color="#f59e0b">
                  <FiShield size={18} />
                </SettingIcon>
                <SettingDetails>
                  <SettingLabel>Analitik Takibi</SettingLabel>
                  <SettingDescription>Uygulama kullanımını analiz et</SettingDescription>
                </SettingDetails>
              </SettingInfo>
              <SettingControl>
                <Toggle 
                  active={settings.analyticsTracking}
                  onClick={() => updateSetting('analyticsTracking', !settings.analyticsTracking)}
                />
              </SettingControl>
            </SettingItem>
            
            <SettingItem>
              <SettingInfo>
                <SettingIcon color="#ef4444">
                  <FiShield size={18} />
                </SettingIcon>
                <SettingDetails>
                  <SettingLabel>Konum Paylaşımı</SettingLabel>
                  <SettingDescription>Konumunu diğer kullanıcılarla paylaş</SettingDescription>
                </SettingDetails>
              </SettingInfo>
              <SettingControl>
                <Toggle 
                  active={settings.locationSharing}
                  onClick={() => updateSetting('locationSharing', !settings.locationSharing)}
                />
              </SettingControl>
            </SettingItem>
          </SectionContent>
        </SettingsSection>

        {/* Uygulama Ayarları */}
        <SettingsSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <SectionHeader>
            <FiSettings size={20} />
            <SectionTitle>Uygulama Ayarları</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <SettingItem>
              <SettingInfo>
                <SettingIcon color="#6366f1">
                  {settings.theme === 'dark' ? <FiMoon size={18} /> : <FiSun size={18} />}
                </SettingIcon>
                <SettingDetails>
                  <SettingLabel>Tema</SettingLabel>
                  <SettingDescription>Aydınlık veya karanlık tema seç</SettingDescription>
                </SettingDetails>
              </SettingInfo>
              <SettingControl>
                <Select 
                  value={settings.theme}
                  onChange={(e) => updateSetting('theme', e.target.value)}
                >
                  <option value="light">Aydınlık</option>
                  <option value="dark">Karanlık</option>
                  <option value="auto">Otomatik</option>
                </Select>
              </SettingControl>
            </SettingItem>
            
            <SettingItem>
              <SettingInfo>
                <SettingIcon color="#10b981">
                  <FiGlobe size={18} />
                </SettingIcon>
                <SettingDetails>
                  <SettingLabel>Dil</SettingLabel>
                  <SettingDescription>Uygulama dilini seç</SettingDescription>
                </SettingDetails>
              </SettingInfo>
              <SettingControl>
                <Select 
                  value={settings.language}
                  onChange={(e) => updateSetting('language', e.target.value)}
                >
                  <option value="tr">Türkçe</option>
                  <option value="en">English</option>
                  <option value="de">Deutsch</option>
                  <option value="fr">Français</option>
                </Select>
              </SettingControl>
            </SettingItem>
            
            <SettingItem>
              <SettingInfo>
                <SettingIcon color="#f59e0b">
                  {settings.soundEffects ? <FiVolume2 size={18} /> : <FiVolumeX size={18} />}
                </SettingIcon>
                <SettingDetails>
                  <SettingLabel>Ses Efektleri</SettingLabel>
                  <SettingDescription>Uygulama ses efektlerini aç/kapat</SettingDescription>
                </SettingDetails>
              </SettingInfo>
              <SettingControl>
                <Toggle 
                  active={settings.soundEffects}
                  onClick={() => updateSetting('soundEffects', !settings.soundEffects)}
                />
              </SettingControl>
            </SettingItem>
            
            <SettingItem>
              <SettingInfo>
                <SettingIcon color="#ef4444">
                  <FiSmartphone size={18} />
                </SettingIcon>
                <SettingDetails>
                  <SettingLabel>Haptic Geri Bildirim</SettingLabel>
                  <SettingDescription>Dokunmatik titreşim geri bildirimi</SettingDescription>
                </SettingDetails>
              </SettingInfo>
              <SettingControl>
                <Toggle 
                  active={settings.hapticFeedback}
                  onClick={() => updateSetting('hapticFeedback', !settings.hapticFeedback)}
                />
              </SettingControl>
            </SettingItem>
          </SectionContent>
        </SettingsSection>

        {/* Güvenlik Ayarları */}
        <SettingsSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <SectionHeader>
            <FiLock size={20} />
            <SectionTitle>Güvenlik Ayarları</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <SettingItem>
              <SettingInfo>
                <SettingIcon color="#10b981">
                  <FiShield size={18} />
                </SettingIcon>
                <SettingDetails>
                  <SettingLabel>İki Faktörlü Kimlik Doğrulama</SettingLabel>
                  <SettingDescription>Hesabınız için ekstra güvenlik katmanı</SettingDescription>
                </SettingDetails>
              </SettingInfo>
              <SettingControl>
                <Toggle 
                  active={settings.twoFactorAuth}
                  onClick={() => updateSetting('twoFactorAuth', !settings.twoFactorAuth)}
                />
              </SettingControl>
            </SettingItem>
            
            <SettingItem>
              <SettingInfo>
                <SettingIcon color="#8b5cf6">
                  <FiUser size={18} />
                </SettingIcon>
                <SettingDetails>
                  <SettingLabel>Biyometrik Giriş</SettingLabel>
                  <SettingDescription>Parmak izi veya yüz tanıma ile giriş</SettingDescription>
                </SettingDetails>
              </SettingInfo>
              <SettingControl>
                <Toggle 
                  active={settings.biometricLogin}
                  onClick={() => updateSetting('biometricLogin', !settings.biometricLogin)}
                />
              </SettingControl>
            </SettingItem>
            
            <SettingItem>
              <SettingInfo>
                <SettingIcon color="#f59e0b">
                  <FiLock size={18} />
                </SettingIcon>
                <SettingDetails>
                  <SettingLabel>Oturum Zaman Aşımı</SettingLabel>
                  <SettingDescription>Otomatik çıkış süresi (dakika)</SettingDescription>
                </SettingDetails>
              </SettingInfo>
              <SettingControl>
                <Select 
                  value={settings.sessionTimeout}
                  onChange={(e) => updateSetting('sessionTimeout', e.target.value)}
                >
                  <option value="15">15 Dakika</option>
                  <option value="30">30 Dakika</option>
                  <option value="60">1 Saat</option>
                  <option value="never">Hiçbir Zaman</option>
                </Select>
              </SettingControl>
            </SettingItem>
            
            <SettingItem clickable>
              <SettingInfo>
                <SettingIcon color="#ef4444">
                  <FiLock size={18} />
                </SettingIcon>
                <SettingDetails>
                  <SettingLabel>Şifre Değiştir</SettingLabel>
                  <SettingDescription>Hesap şifrenizi güncelleyin</SettingDescription>
                </SettingDetails>
              </SettingInfo>
              <SettingControl>
                <ChevronIcon size={20} />
              </SettingControl>
            </SettingItem>
          </SectionContent>
        </SettingsSection>

        {/* Veri Yönetimi */}
        <SettingsSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <SectionHeader>
            <FiDownload size={20} />
            <SectionTitle>Veri Yönetimi</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <SettingItem clickable>
              <SettingInfo>
                <SettingIcon color="#10b981">
                  <FiDownload size={18} />
                </SettingIcon>
                <SettingDetails>
                  <SettingLabel>Verilerimi İndir</SettingLabel>
                  <SettingDescription>Tüm verilerinizi ZIP dosyası olarak indirin</SettingDescription>
                </SettingDetails>
              </SettingInfo>
              <SettingControl>
                <Button variant="success">
                  <FiDownload size={16} />
                  İndir
                </Button>
              </SettingControl>
            </SettingItem>
            
            <SettingItem clickable>
              <SettingInfo>
                <SettingIcon color="#3b82f6">
                  <FiUpload size={18} />
                </SettingIcon>
                <SettingDetails>
                  <SettingLabel>Verileri İçe Aktar</SettingLabel>
                  <SettingDescription>Başka uygulamalardan veri aktarın</SettingDescription>
                </SettingDetails>
              </SettingInfo>
              <SettingControl>
                <Button>
                  <FiUpload size={16} />
                  İçe Aktar
                </Button>
              </SettingControl>
            </SettingItem>
          </SectionContent>
        </SettingsSection>
      </SettingsGrid>

      {/* Tehlikeli Bölge */}
      <DangerZone>
        <DangerTitle>
          <FiTrash2 />
          Tehlikeli Bölge
        </DangerTitle>
        <DangerActions>
          <Button variant="danger">
            <FiTrash2 size={16} />
            Hesabı Sil
          </Button>
          <Button variant="danger">
            <FiLogOut size={16} />
            Tüm Cihazlardan Çıkış Yap
          </Button>
        </DangerActions>
      </DangerZone>

      {/* Kaydet Çubuğu */}
      {hasChanges && (
        <SaveBar
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
        >
          <SaveMessage>Kaydedilmemiş değişiklikleriniz var</SaveMessage>
          <Button onClick={saveSettings}>
            <FiSave size={16} />
            Kaydet
          </Button>
          <Button 
            variant="danger" 
            onClick={resetSettings}
            style={{ background: 'transparent', color: '#ef4444' }}
          >
            <FiX size={16} />
            İptal
          </Button>
        </SaveBar>
      )}
    </SettingsContainer>
  );
};

export default Settings;