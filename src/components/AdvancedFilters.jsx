import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function AdvancedFilters({ destinations, onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    difficulty: 'all',
    duration: 'all',
    searchText: ''
  });
  const { language, t } = useLanguage();

  // Verificar se destinations é um array válido
  const validDestinations = Array.isArray(destinations) ? destinations : [];

  const applyFilters = (newFilters) => {
    let filtered = [...validDestinations];

    // Filtro por categoria
    if (newFilters.category !== 'all') {
      filtered = filtered.filter(dest => dest.category === newFilters.category);
    }

    // Filtro por dificuldade
    if (newFilters.difficulty !== 'all') {
      const difficultyField = language === 'pt' ? 'difficulty' : 'difficultyEn';
      filtered = filtered.filter(dest => dest[difficultyField] === newFilters.difficulty);
    }

    // Filtro por duração
    if (newFilters.duration !== 'all') {
      filtered = filtered.filter(dest => {
        try {
          const duration = language === 'pt' ? (dest.duration || '') : (dest.durationEn || '');
          // Verificar se duration existe e não está vazio
          if (!duration) return false;
          
          // Extrair o número de horas da string (ex: "2-3 horas" -> 2)
          const hoursMatch = duration.match(/(\d+)/);
          if (!hoursMatch) return false;
          
          const hours = parseInt(hoursMatch[1], 10);
          if (isNaN(hours)) return false;
          
          switch (newFilters.duration) {
            case 'short': return hours <= 2;
            case 'medium': return hours > 2 && hours <= 4;
            case 'long': return hours > 4;
            default: return true;
          }
        } catch (error) {
          console.error('Erro ao filtrar por duração:', error);
          return true;
        }
      });
    }

    // Filtro por texto de busca
    if (newFilters.searchText) {
      const searchLower = newFilters.searchText.toLowerCase().trim();
      if (searchLower) {
        filtered = filtered.filter(dest => {
          try {
            const name = (language === 'pt' ? (dest.name || '') : (dest.nameEn || '')).toLowerCase();
            const description = (language === 'pt' ? (dest.description || '') : (dest.descriptionEn || '')).toLowerCase();
            
            // Verificar se highlights é um array válido
            const highlightsArray = Array.isArray(dest.highlights) ? dest.highlights : [];
            const highlights = highlightsArray.join(' ').toLowerCase();
            
            return name.includes(searchLower) || 
                   description.includes(searchLower) || 
                   highlights.includes(searchLower);
          } catch (error) {
            console.error('Erro ao filtrar por texto:', error);
            return false;
          }
        });
      }
    }

    // Chamar onFilterChange apenas se for uma função válida
    if (onFilterChange && typeof onFilterChange === 'function') {
      onFilterChange(filtered);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: 'all',
      difficulty: 'all',
      duration: 'all',
      searchText: ''
    };
    setFilters(clearedFilters);
    applyFilters(clearedFilters);
  };

  const categories = [
    { id: 'all', label: t('Todas', 'All') },
    { id: 'Trilhas e ecoturismo', label: t('Trilhas e ecoturismo', 'Trails and ecotourism') },
    { id: 'Turismo cultural', label: t('Turismo cultural', 'Cultural tourism') },
    { id: 'Gastronomia local', label: t('Gastronomia local', 'Local gastronomy') },
    { id: 'Hospedagens e guias credenciados', label: t('Hospedagens', 'Accommodations') },
  ];

  const difficulties = [
    { id: 'all', label: t('Todas', 'All') },
    { id: language === 'pt' ? 'Fácil' : 'Easy', label: t('Fácil', 'Easy') },
    { id: language === 'pt' ? 'Moderada' : 'Moderate', label: t('Moderada', 'Moderate') },
    { id: language === 'pt' ? 'Difícil' : 'Hard', label: t('Difícil', 'Hard') },
  ];

  const durations = [
    { id: 'all', label: t('Qualquer duração', 'Any duration') },
    { id: 'short', label: t('Até 2 horas', 'Up to 2 hours') },
    { id: 'medium', label: t('2-4 horas', '2-4 hours') },
    { id: 'long', label: t('Mais de 4 horas', 'More than 4 hours') },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border mb-6 relative z-30">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">
            <i className="fa-solid fa-filter mr-2"></i>
            {t('Filtros Avançados', 'Advanced Filters')}
          </h3>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-blue-600 hover:text-blue-700 transition-colors"
            aria-label={isOpen ? t('Fechar filtros', 'Close filters') : t('Abrir filtros', 'Open filters')}
          >
            <i className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'}`}></i>
          </button>
        </div>

        {/* Barra de busca sempre visível */}
        <div className="relative mb-4">
          <i className="fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            placeholder={t('Buscar destinos...', 'Search destinations...')}
            value={filters.searchText}
            onChange={(e) => handleFilterChange('searchText', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Filtros expandidos */}
        {isOpen && (
          <div className="space-y-4 border-t pt-4">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Categoria */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('Categoria', 'Category')}
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dificuldade */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('Dificuldade', 'Difficulty')}
                </label>
                <select
                  value={filters.difficulty}
                  onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {difficulties.map((diff) => (
                    <option key={diff.id} value={diff.id}>
                      {diff.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duração */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('Duração', 'Duration')}
                </label>
                <select
                  value={filters.duration}
                  onChange={(e) => handleFilterChange('duration', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {durations.map((dur) => (
                    <option key={dur.id} value={dur.id}>
                      {dur.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Botão limpar filtros */}
            <div className="flex justify-end">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                <i className="fa-solid fa-times mr-1"></i>
                {t('Limpar Filtros', 'Clear Filters')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}