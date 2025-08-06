import { useState, useMemo, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MS_IMAGES } from '../data/images';
import ImageGallery from '../components/ImageGallery';
import { PageLayout, HeroSection, ContentSection, PageFooter } from '../components/PageLayout';

// Componente para os filtros de categoria
const CategoryFilters = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <section className="py-6 sm:py-8 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-label={`Filtrar por ${category.name}`}
            >
              <i className={category.icon}></i>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

// Componente para a galeria principal
const MainGallery = ({ images, activeCategory, categoryName, imageCount }) => {
  return (
    <ContentSection>
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-4">
          {categoryName}
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          {imageCount}
        </p>
      </div>

      <ImageGallery 
        images={images}
        title=""
        subtitle=""
        category={activeCategory}
      />
    </ContentSection>
  );
};

// Componente para a seção de categorias
const CategorySection = ({ categories, onCategoryChange, imageCounts }) => {
  const { t } = useLanguage();
  
  return (
    <ContentSection className="bg-white">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-4">
          {t('Explore por Categoria', 'Explore by Category')}
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          {t('Descubra diferentes aspectos da nossa região', 'Discover different aspects of our region')}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
        {categories.slice(1).map((category) => (
          <div 
            key={category.id}
            className="group cursor-pointer"
            onClick={() => onCategoryChange(category.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onCategoryChange(category.id);
              }
            }}
            aria-label={`Ver imagens da categoria ${category.name}`}
          >
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 sm:p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-3xl sm:text-4xl text-blue-600 mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                <i className={category.icon}></i>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{category.name}</h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                {imageCounts[category.id]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ContentSection>
  );
};

export default function Gallery() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  // Memoização das categorias para evitar re-renderizações desnecessárias
  const categories = useMemo(() => [
    { id: 'all', name: t('Todas', 'All'), icon: 'fa-solid fa-images' },
    { id: 'pantanal', name: t('Pantanal', 'Pantanal'), icon: 'fa-solid fa-water' },
    { id: 'serra', name: t('Serra', 'Mountain Range'), icon: 'fa-solid fa-mountain' },
    { id: 'fauna', name: t('Fauna', 'Fauna'), icon: 'fa-solid fa-paw' },
    { id: 'flora', name: t('Flora', 'Flora'), icon: 'fa-solid fa-seedling' }
  ], [t]);

  // Memoização das imagens filtradas
  const filteredImages = useMemo(() => {
    if (activeCategory === 'all') {
      return Object.values(MS_IMAGES.gallery).flat();
    }
    return MS_IMAGES.gallery[activeCategory] || [];
  }, [activeCategory]);

  // Memoização das contagens de imagens por categoria
  const imageCounts = useMemo(() => {
    const counts = {};
    categories.forEach(category => {
      if (category.id === 'all') {
        counts[category.id] = t(`${Object.values(MS_IMAGES.gallery).flat().length} imagens encontradas`, `${Object.values(MS_IMAGES.gallery).flat().length} images found`);
      } else {
        counts[category.id] = t(`${MS_IMAGES.gallery[category.id]?.length || 0} imagens`, `${MS_IMAGES.gallery[category.id]?.length || 0} images`);
      }
    });
    return counts;
  }, [categories, t]);

  // Callback para mudança de categoria
  const handleCategoryChange = useCallback((categoryId) => {
    setActiveCategory(categoryId);
  }, []);

  // Dados do hero
  const heroData = useMemo(() => ({
    title: t('Galeria do Mato Grosso do Sul', 'Mato Grosso do Sul Gallery'),
    subtitle: t(
      'Explore a beleza natural e cultural de nossa região através de imagens deslumbrantes',
      'Explore the natural and cultural beauty of our region through stunning images'
    )
  }), [t]);

  return (
    <PageLayout title={t('Galeria', 'Gallery')}>
      <HeroSection 
        title={heroData.title}
        subtitle={heroData.subtitle}
      />

      <CategoryFilters 
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <MainGallery 
        images={filteredImages}
        activeCategory={activeCategory}
        categoryName={categories.find(c => c.id === activeCategory)?.name}
        imageCount={imageCounts[activeCategory]}
      />

      <CategorySection 
        categories={categories}
        onCategoryChange={handleCategoryChange}
        imageCounts={imageCounts}
      />

      <PageFooter />
    </PageLayout>
  );
} 