import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch,
  FiFilter,
  FiClock,
  FiUsers,
  FiHeart,
  FiBookmark,
  FiShare2,
  FiUser,
  FiSettings,
  FiZap,
  FiStar,
  FiTrendingUp,
  FiAward,
  FiTarget
} from 'react-icons/fi';

const RecipesContainer = styled(motion.div)`
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

const RecipeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const RecipeCard = styled(motion.div)`
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

const RecipeImage = styled.div`
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

const RecipeActions = styled.div`
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

const DifficultyBadge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 2;
`;

const RecipeContent = styled.div`
  padding: 1.5rem;
`;

const RecipeTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${props => props.theme.colors.gray[800]};
  margin-bottom: 0.5rem;
`;

const RecipeDescription = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const RecipeMeta = styled.div`
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

const NutritionInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: ${props => props.theme.colors.gray[50]};
  border-radius: 12px;
`;

const NutritionItem = styled.div`
  text-align: center;
`;

const NutritionValue = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
`;

const NutritionLabel = styled.div`
  font-size: 0.7rem;
  color: ${props => props.theme.colors.gray[600]};
  text-transform: uppercase;
  font-weight: 600;
`;

const RecipeFooter = styled.div`
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

const CategoryTag = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => {
    switch (props.category) {
      case 'Kahvaltı': return '#fef3c7';
      case 'Öğle': return '#dbeafe';
      case 'Akşam': return '#e0e7ff';
      case 'Atıştırmalık': return '#fce7f3';
      case 'Protein': return '#dcfce7';
      case 'Vegan': return '#f0fdf4';
      default: return '#f3f4f6';
    }
  }};
  color: ${props => {
    switch (props.category) {
      case 'Kahvaltı': return '#92400e';
      case 'Öğle': return '#1e40af';
      case 'Akşam': return '#3730a3';
      case 'Atıştırmalık': return '#be185d';
      case 'Protein': return '#166534';
      case 'Vegan': return '#14532d';
      default: return '#374151';
    }
  }};
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

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Tümü');
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      title: 'Protein Smoothie Bowl',
      description: 'Antrenman sonrası için ideal protein açısından zengin smoothie bowl.',
      prepTime: 10,
      servings: 1,
      difficulty: 'Kolay',
      category: 'Kahvaltı',
      rating: 4.8,
      calories: 320,
      protein: 25,
      carbs: 35,
      fat: 8,
      gradient: ['#667eea', '#764ba2'],
      icon: '🥣'
    },
    {
      id: 2,
      title: 'Izgara Tavuk Salatası',
      description: 'Yüksek protein, düşük karbonhidrat içeren besleyici öğle yemeği.',
      prepTime: 25,
      servings: 2,
      difficulty: 'Orta',
      category: 'Öğle',
      rating: 4.6,
      calories: 280,
      protein: 35,
      carbs: 12,
      fat: 10,
      gradient: ['#f093fb', '#f5576c'],
      icon: '🥗'
    },
    {
      id: 3,
      title: 'Quinoa Buddha Bowl',
      description: 'Vegan dostu, besin değeri yüksek renkli quinoa kasesi.',
      prepTime: 30,
      servings: 2,
      difficulty: 'Orta',
      category: 'Vegan',
      rating: 4.9,
      calories: 380,
      protein: 15,
      carbs: 45,
      fat: 18,
      gradient: ['#4facfe', '#00f2fe'],
      icon: '🥙'
    },
    {
      id: 4,
      title: 'Somon ve Avokado Toast',
      description: 'Omega-3 açısından zengin, sağlıklı yağlar içeren kahvaltı.',
      prepTime: 15,
      servings: 1,
      difficulty: 'Kolay',
      category: 'Kahvaltı',
      rating: 4.7,
      calories: 420,
      protein: 28,
      carbs: 25,
      fat: 22,
      gradient: ['#fa709a', '#fee140'],
      icon: '🍞'
    },
    {
      id: 5,
      title: 'Protein Topları',
      description: 'Antrenman öncesi enerji için ideal sağlıklı atıştırmalık.',
      prepTime: 20,
      servings: 12,
      difficulty: 'Kolay',
      category: 'Atıştırmalık',
      rating: 4.5,
      calories: 95,
      protein: 6,
      carbs: 8,
      fat: 4,
      gradient: ['#a8edea', '#fed6e3'],
      icon: '🍪'
    },
    {
      id: 6,
      title: 'Sebzeli Omlet',
      description: 'Vitamin ve mineral açısından zengin protein kaynağı.',
      prepTime: 12,
      servings: 1,
      difficulty: 'Kolay',
      category: 'Protein',
      rating: 4.4,
      calories: 250,
      protein: 20,
      carbs: 8,
      fat: 15,
      gradient: ['#ffecd2', '#fcb69f'],
      icon: '🍳'
    },
    {
      id: 7,
      title: 'Akdeniz Balık Yemeği',
      description: 'Zeytinyağı ve sebzelerle marine edilmiş sağlıklı balık.',
      prepTime: 35,
      servings: 3,
      difficulty: 'Zor',
      category: 'Akşam',
      rating: 4.8,
      calories: 340,
      protein: 32,
      carbs: 15,
      fat: 18,
      gradient: ['#ff9a9e', '#fecfef'],
      icon: '🐟'
    },
    {
      id: 8,
      title: 'Chia Pudding',
      description: 'Fiber ve omega-3 açısından zengin sağlıklı tatlı.',
      prepTime: 5,
      servings: 2,
      difficulty: 'Kolay',
      category: 'Atıştırmalık',
      rating: 4.6,
      calories: 180,
      protein: 8,
      carbs: 20,
      fat: 9,
      gradient: ['#a18cd1', '#fbc2eb'],
      icon: '🍮'
    }
  ]);

  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  const filterCategories = [
    { name: 'Tümü', icon: FiTrendingUp },
    { name: 'Kahvaltı', icon: FiZap },
    { name: 'Öğle', icon: FiTarget },
    { name: 'Akşam', icon: FiAward },
    { name: 'Atıştırmalık', icon: FiHeart },
    { name: 'Protein', icon: FiUser },
    { name: 'Vegan', icon: FiSettings }
  ];

  useEffect(() => {
    let filtered = recipes;

    if (activeFilter !== 'Tümü') {
      filtered = filtered.filter(recipe => recipe.category === activeFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(recipe => 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRecipes(filtered);
  }, [searchTerm, activeFilter, recipes]);

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
    <RecipesContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header>
        <Title>Sağlıklı Tarifler</Title>
        <Subtitle>
          Fitness hedeflerinizi destekleyen besleyici ve lezzetli tarifler keşfedin.
        </Subtitle>
      </Header>

      <FilterSection>
        <SearchBar>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Tarif ara..."
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

      <RecipeGrid>
        <AnimatePresence>
          {filteredRecipes.map((recipe, index) => (
            <RecipeCard
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <RecipeImage gradient={recipe.gradient}>
                <DifficultyBadge>{recipe.difficulty}</DifficultyBadge>
                
                <RecipeActions>
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
                </RecipeActions>
                
                <div style={{ 
                  position: 'absolute', 
                  bottom: '1rem', 
                  left: '1rem',
                  fontSize: '2rem',
                  zIndex: 2
                }}>
                  {recipe.icon}
                </div>
              </RecipeImage>
              
              <RecipeContent>
                <RecipeTitle>{recipe.title}</RecipeTitle>
                <RecipeDescription>{recipe.description}</RecipeDescription>
                
                <RecipeMeta>
                  <MetaGroup>
                    <MetaItem>
                      <FiClock size={14} />
                      {recipe.prepTime} dk
                    </MetaItem>
                    <MetaItem>
                      <FiUsers size={14} />
                      {recipe.servings} kişi
                    </MetaItem>
                  </MetaGroup>
                  <CategoryTag category={recipe.category}>
                    {recipe.category}
                  </CategoryTag>
                </RecipeMeta>
                
                <NutritionInfo>
                  <NutritionItem>
                    <NutritionValue>{recipe.calories}</NutritionValue>
                    <NutritionLabel>Kalori</NutritionLabel>
                  </NutritionItem>
                  <NutritionItem>
                    <NutritionValue>{recipe.protein}g</NutritionValue>
                    <NutritionLabel>Protein</NutritionLabel>
                  </NutritionItem>
                  <NutritionItem>
                    <NutritionValue>{recipe.carbs}g</NutritionValue>
                    <NutritionLabel>Karb</NutritionLabel>
                  </NutritionItem>
                </NutritionInfo>
                
                <RecipeFooter>
                  <RatingSection>
                    <Stars>
                      {renderStars(recipe.rating)}
                    </Stars>
                    <RatingText>{recipe.rating}</RatingText>
                  </RatingSection>
                  
                  <ActionButton
                    style={{ 
                      position: 'static',
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      width: 'auto',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px'
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiHeart size={16} />
                  </ActionButton>
                </RecipeFooter>
              </RecipeContent>
            </RecipeCard>
          ))}
        </AnimatePresence>
      </RecipeGrid>

      {filteredRecipes.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#6b7280'
          }}
        >
          <h3>Aradığınız kriterlere uygun tarif bulunamadı.</h3>
          <p>Farklı arama terimleri veya filtreler deneyebilirsiniz.</p>
        </motion.div>
      )}

      <LoadMoreButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Daha Fazla Tarif Yükle
      </LoadMoreButton>
    </RecipesContainer>
  );
};

export default Recipes;