import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  FiShoppingBag,
  FiSearch,
  FiFilter,
  FiStar,
  FiHeart,
  FiShoppingCart,
  FiPackage,
  FiTruck,
  FiCreditCard,
  FiTag,
  FiZap,
  FiActivity,
  FiTarget
} from 'react-icons/fi';

const StoreContainer = styled(motion.div)`
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

const SearchAndFilter = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const SearchBar = styled.div`
  flex: 1;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid ${props => props.theme.colors.gray[200]};
  border-radius: 12px;
  font-size: 1rem;
  background: white;
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

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.gray[400]};
  pointer-events: none;
`;

const FilterButton = styled(motion.button)`
  padding: 1rem 1.5rem;
  border: 2px solid ${props => props.theme.colors.gray[200]};
  background: white;
  color: ${props => props.theme.colors.gray[600]};
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }
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

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
`;

const ProductCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.md};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

const ProductImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, ${props => props.color || props.theme.colors.primary}, ${props => props.colorSecondary || props.theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  position: relative;
`;

const ProductBadge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: ${props => {
    switch (props.type) {
      case 'new': return '#10b981';
      case 'sale': return '#ef4444';
      case 'popular': return '#f59e0b';
      default: return props.theme.colors.primary;
    }
  }};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
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

const ProductInfo = styled.div`
  padding: 1.5rem;
`;

const ProductCategory = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.gray[500]};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.gray[800]};
  margin-bottom: 0.5rem;
  line-height: 1.3;
`;

const ProductDescription = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
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
  font-size: 0.9rem;
  color: ${props => props.theme.colors.gray[600]};
  font-weight: 600;
`;

const ProductFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: ${props => props.theme.colors.primary};
`;

const OriginalPrice = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.gray[500]};
  text-decoration: line-through;
`;

const AddToCartButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
`;

const Store = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const [favorites, setFavorites] = useState(new Set());

  const categories = [
    'Tümü',
    'Ekipmanlar',
    'Takviyeler',
    'Giyim',
    'Aksesuarlar',
    'Teknoloji'
  ];

  const products = [
    {
      id: 1,
      name: 'Premium Whey Protein',
      category: 'Takviyeler',
      description: 'Yüksek kaliteli whey protein tozu, kas gelişimi için ideal.',
      price: 299,
      originalPrice: 349,
      rating: 4.8,
      reviews: 156,
      badge: 'popular',
      color: '#10b981',
      colorSecondary: '#34d399',
      icon: <FiZap />
    },
    {
      id: 2,
      name: 'Ayarlanabilir Dumbbell Seti',
      category: 'Ekipmanlar',
      description: 'Evde antrenman için mükemmel, 5-50kg arası ayarlanabilir.',
      price: 1299,
      originalPrice: null,
      rating: 4.9,
      reviews: 89,
      badge: 'new',
      color: '#8b5cf6',
      colorSecondary: '#a78bfa',
      icon: <FiActivity />
    },
    {
      id: 3,
      name: 'Fitness Tracker Pro',
      category: 'Teknoloji',
      description: 'Gelişmiş fitness takip cihazı, kalp ritmi ve uyku analizi.',
      price: 899,
      originalPrice: 1199,
      rating: 4.7,
      reviews: 234,
      badge: 'sale',
      color: '#ef4444',
      colorSecondary: '#f87171',
      icon: <FiTarget />
    },
    {
      id: 4,
      name: 'Yoga Matı Premium',
      category: 'Ekipmanlar',
      description: 'Anti-slip yüzey, ekstra kalın ve dayanıklı yoga matı.',
      price: 199,
      originalPrice: null,
      rating: 4.6,
      reviews: 78,
      badge: null,
      color: '#f59e0b',
      colorSecondary: '#fbbf24',
      icon: <FiHeart />
    },
    {
      id: 5,
      name: 'Spor T-Shirt',
      category: 'Giyim',
      description: 'Nefes alabilir kumaş, ter emici özellik, rahat kesim.',
      price: 89,
      originalPrice: 129,
      rating: 4.5,
      reviews: 167,
      badge: 'sale',
      color: '#3b82f6',
      colorSecondary: '#60a5fa',
      icon: <FiPackage />
    },
    {
      id: 6,
      name: 'Resistance Band Seti',
      category: 'Ekipmanlar',
      description: '5 farklı direnç seviyesi, taşıma çantası dahil.',
      price: 149,
      originalPrice: null,
      rating: 4.4,
      reviews: 92,
      badge: 'new',
      color: '#06b6d4',
      colorSecondary: '#22d3ee',
      icon: <FiActivity />
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Tümü' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} filled={index < Math.floor(rating)} size={14} />
    ));
  };

  const getBadgeText = (type) => {
    switch (type) {
      case 'new': return 'YENİ';
      case 'sale': return 'İNDİRİM';
      case 'popular': return 'POPÜLER';
      default: return '';
    }
  };

  return (
    <StoreContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header>
        <Title>
          <FiShoppingBag />
          FitMe Mağaza
        </Title>
        <Subtitle>
          Fitness hedeflerinize ulaşmak için ihtiyacınız olan her şey burada.
        </Subtitle>
      </Header>

      <SearchAndFilter>
        <SearchBar>
          <SearchIcon size={20} />
          <SearchInput
            type="text"
            placeholder="Ürün ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>
        <FilterButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiFilter size={16} />
          Filtrele
        </FilterButton>
      </SearchAndFilter>

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

      <ProductGrid>
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <ProductImage color={product.color} colorSecondary={product.colorSecondary}>
              {product.icon}
              {product.badge && (
                <ProductBadge type={product.badge}>
                  {getBadgeText(product.badge)}
                </ProductBadge>
              )}
              <FavoriteButton
                favorited={favorites.has(product.id)}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(product.id);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiHeart size={18} />
              </FavoriteButton>
            </ProductImage>
            
            <ProductInfo>
              <ProductCategory>{product.category}</ProductCategory>
              <ProductName>{product.name}</ProductName>
              <ProductDescription>{product.description}</ProductDescription>
              
              <ProductRating>
                <Stars>{renderStars(product.rating)}</Stars>
                <RatingText>{product.rating} ({product.reviews} değerlendirme)</RatingText>
              </ProductRating>
              
              <ProductFooter>
                <PriceContainer>
                  <Price>₺{product.price}</Price>
                  {product.originalPrice && (
                    <OriginalPrice>₺{product.originalPrice}</OriginalPrice>
                  )}
                </PriceContainer>
                
                <AddToCartButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiShoppingCart size={16} />
                  Sepete Ekle
                </AddToCartButton>
              </ProductFooter>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>
    </StoreContainer>
  );
};

export default Store;