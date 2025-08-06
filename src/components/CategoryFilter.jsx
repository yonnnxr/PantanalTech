import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const CATEGORIES = [
  { id: 'all', iconClass: 'fa-solid fa-clipboard-list', labelPt: 'Todos', labelEn: 'All' },
  { id: 'Trilhas e ecoturismo', iconClass: 'fa-solid fa-hiking', labelPt: 'Trilhas e ecoturismo', labelEn: 'Trails and ecotourism' },
  { id: 'Turismo cultural', iconClass: 'fa-solid fa-building', labelPt: 'Turismo cultural', labelEn: 'Cultural tourism' },
  { id: 'Gastronomia local', iconClass: 'fa-solid fa-utensils', labelPt: 'Gastronomia local', labelEn: 'Local gastronomy' },
  { id: 'Hospedagens e guias credenciados', iconClass: 'fa-solid fa-bed', labelPt: 'Hospedagens', labelEn: 'Accommodations' },

];

export default function CategoryFilter({ destinations, onFilterChange }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { language, t } = useLanguage();

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    
    if (categoryId === 'all') {
      onFilterChange(destinations);
    } else {
      const filtered = destinations.filter(dest => dest.category === categoryId);
      onFilterChange(filtered);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
      <h3 className="font-semibold text-gray-800 mb-3">
        {t('Filtrar por categoria', 'Filter by category')}
      </h3>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-full border transition-all ${
              selectedCategory === category.id
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300 text-gray-600'
            }`}
            aria-label={language === 'pt' ? category.labelPt : category.labelEn}
          >
            <i className={`${category.iconClass} text-sm`}></i>
            <span className="text-sm font-medium">
              {language === 'pt' ? category.labelPt : category.labelEn}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}