import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MS_IMAGES } from '../data/images';
import ImageGallery from '../components/ImageGallery';
import LanguageToggle from '../components/LanguageToggle';
import ThemeToggle from '../components/ThemeToggle';
import Logo from '../components/Logo';

export default function Gallery() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: t('Todas', 'All'), icon: 'fa-solid fa-images' },
    { id: 'pantanal', name: t('Pantanal', 'Pantanal'), icon: 'fa-solid fa-water' },
    { id: 'serra', name: t('Serra', 'Mountain Range'), icon: 'fa-solid fa-mountain' },
    { id: 'fauna', name: t('Fauna', 'Fauna'), icon: 'fa-solid fa-paw' },
    { id: 'flora', name: t('Flora', 'Flora'), icon: 'fa-solid fa-seedling' }
  ];

  const getFilteredImages = () => {
    if (activeCategory === 'all') {
      return Object.values(MS_IMAGES.gallery).flat();
    }
    return MS_IMAGES.gallery[activeCategory] || [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Logo 
                size="medium" 
                textColor="text-gray-800" 
                className="hover:opacity-90"
              />
              <span className="text-sm text-gray-600">/ {t('Galeria', 'Gallery')}</span>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <LanguageToggle textColor="text-gray-800" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            {t('Galeria do Mato Grosso do Sul', 'Mato Grosso do Sul Gallery')}
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            {t(
              'Explore a beleza natural e cultural de nossa região através de imagens deslumbrantes',
              'Explore the natural and cultural beauty of our region through stunning images'
            )}
          </p>
        </div>
      </section>

      {/* Filtros */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <i className={category.icon}></i>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria Principal */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {categories.find(c => c.id === activeCategory)?.name}
            </h2>
            <p className="text-gray-600">
              {t(`${getFilteredImages().length} imagens encontradas`, `${getFilteredImages().length} images found`)}
            </p>
          </div>

          <ImageGallery 
            images={getFilteredImages()}
            title=""
            subtitle=""
            category={activeCategory}
          />
        </div>
      </section>

      {/* Seção de Categorias */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {t('Explore por Categoria', 'Explore by Category')}
            </h2>
            <p className="text-gray-600">
              {t('Descubra diferentes aspectos da nossa região', 'Discover different aspects of our region')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.slice(1).map((category) => (
              <div 
                key={category.id}
                className="group cursor-pointer"
                onClick={() => setActiveCategory(category.id)}
              >
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-4xl text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <i className={category.icon}></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm">
                    {t(`${MS_IMAGES.gallery[category.id]?.length || 0} imagens`, `${MS_IMAGES.gallery[category.id]?.length || 0} images`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Logo 
            size="large" 
            textColor="text-white" 
            className="mb-6 mx-auto"
          />
          <p className="text-gray-400">
            &copy; 2025 {t('Rota Serra & Paxixi. Todos os direitos reservados.', 'Serra & Paxixi Route. All rights reserved.')}
          </p>
        </div>
      </footer>
    </div>
  );
} 