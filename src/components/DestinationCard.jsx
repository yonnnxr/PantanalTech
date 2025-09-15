import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useRoute } from '../contexts/RouteContext';
import DestinationModal from './DestinationModal';
import { FavoriteButton } from './FavoritesManager';
import { Z_INDEX } from '../utils/zIndex';

export default function DestinationCard({ destination, onSelect, isSelected }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { language, t } = useLanguage();
  const { addDestination, removeDestination, selectedDestinations } = useRoute();

  // Verificar se destination existe
  if (!destination) {
    return null;
  }

  // Verificar se destination.images existe e é um array
  const validImages = Array.isArray(destination.images) ? destination.images : [];
  
  // Verificar se currentImageIndex é válido
  const validCurrentImageIndex = typeof currentImageIndex === 'number' && 
                                currentImageIndex >= 0 && 
                                currentImageIndex < validImages.length ? 
                                currentImageIndex : 0;

  const nextImage = (e) => {
    e.stopPropagation();
    if (validImages.length > 0) {
      const nextIndex = validCurrentImageIndex === validImages.length - 1 ? 0 : validCurrentImageIndex + 1;
      setCurrentImageIndex(nextIndex);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (validImages.length > 0) {
      const prevIndex = validCurrentImageIndex === 0 ? validImages.length - 1 : validCurrentImageIndex - 1;
      setCurrentImageIndex(prevIndex);
    }
  };

  const toggleInRoute = (e) => {
    e.stopPropagation();
    if (isInRoute) {
      if (removeDestination && typeof removeDestination === 'function') {
        removeDestination(destination.id);
      }
    } else {
      if (addDestination && typeof addDestination === 'function') {
        addDestination(destination);
      }
    }
  };

  // Verificar se selectedDestinations é um array válido
  const validSelectedDestinations = Array.isArray(selectedDestinations) ? selectedDestinations : [];
  const isInRoute = validSelectedDestinations.some(d => d.id === destination.id);

  const categoryColors = {
    'Trilhas e ecoturismo': 'bg-green-100 text-green-800',
    'Trails and ecotourism': 'bg-green-100 text-green-800',
    'Turismo cultural': 'bg-blue-100 text-blue-800',
    'Cultural tourism': 'bg-blue-100 text-blue-800',
    'Gastronomia local': 'bg-orange-100 text-orange-800',
    'Local gastronomy': 'bg-orange-100 text-orange-800',
    'Hospedagens e guias credenciados': 'bg-purple-100 text-purple-800',
    'Accommodations and certified guides': 'bg-purple-100 text-purple-800'
  };

  const difficultyColors = {
    'Fácil': 'text-green-600',
    'Easy': 'text-green-600',
    'Moderada': 'text-yellow-600',
    'Moderate': 'text-yellow-600',
    'Difícil': 'text-red-600',
    'Hard': 'text-red-600',
  };

  // Verificar se schedule existe
  const schedule = destination.schedule || destination.scheduleEn || {};
  const difficulty = language === 'pt' ? (destination.difficulty || '') : (destination.difficultyEn || '');

  return (
    <div
      className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      style={{ zIndex: 0 }}
      onClick={() => {
        if (!isModalOpen) {
          setIsModalOpen(true);
          if (onSelect && typeof onSelect === 'function') {
            onSelect(destination);
          }
        }
      }}
    >
      {/* Galeria de imagens */}
      <div className="relative h-48 overflow-hidden">
        {validImages.length > 0 ? (
          <img
            src={validImages[validCurrentImageIndex]}
            alt={language === 'pt' ? (destination.name || '') : (destination.nameEn || '')}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Imagem de fallback caso a imagem não carregue
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbSBuw6NvIGRpcG9uw608L3RleHQ+PC9zdmc+';
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <i className="fa-solid fa-image text-4xl text-gray-400"></i>
          </div>
        )}
        
        {/* Navegação da galeria */}
        {validImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70"
              aria-label={t('Imagem anterior', 'Previous image')}
            >
              ←
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70"
              aria-label={t('Próxima imagem', 'Next image')}
            >
              →
            </button>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              {validImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === validCurrentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Categoria e botão de rota */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            categoryColors[language === 'pt' ? (destination.category || '') : (destination.categoryEn || '')] || 'bg-gray-100 text-gray-800'
          }`}>
            <i className={`${destination.icon || 'fa-solid fa-location-dot'} mr-1`}></i> 
            {language === 'pt' ? (destination.category || '') : (destination.categoryEn || '')}
          </span>
        </div>
        
        <div className="absolute top-3 right-3 flex gap-2">
          <FavoriteButton destination={destination} className="bg-white bg-opacity-80" />
          <button
            onClick={toggleInRoute}
            className={`p-2 rounded-full transition-colors ${
              isInRoute 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
            title={isInRoute 
              ? t('Remover da rota', 'Remove from route') 
              : t('Adicionar à rota', 'Add to route')
            }
            aria-label={isInRoute 
              ? t('Remover da rota', 'Remove from route') 
              : t('Adicionar à rota', 'Add to route')
            }
          >
            {isInRoute ? '✕' : '+'}
          </button>
        </div>
      </div>

      {/* Conteúdo do card */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          {language === 'pt' ? (destination.name || '') : (destination.nameEn || '')}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {language === 'pt' ? (destination.description || '') : (destination.descriptionEn || '')}
        </p>

        {/* Informações básicas */}
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-3">
          <div>
            <span className="font-medium">{t('Duração:', 'Duration:')}</span>
            <br />
            {language === 'pt' ? (destination.duration || '') : (destination.durationEn || '')}
          </div>
          <div>
            <span className={`font-medium ${difficultyColors[difficulty] || 'text-gray-500'}`}>
              ● {difficulty || t('Não especificada', 'Not specified')}
            </span>
          </div>
        </div>

        {/* Horários */}
        <div className="text-xs text-gray-500 mb-3">
          <span className="font-medium">{t('Horários:', 'Schedule:')}</span>
          <div>{schedule.weekdays || t('Não especificado', 'Not specified')}</div>
          {schedule.closed && schedule.closed !== 'Nunca fechado' && schedule.closed !== 'Never closed' && (
            <div className="text-red-600">{schedule.closed}</div>
          )}
        </div>

        {/* Destaques */}
        <div className="flex flex-wrap gap-1 mb-3">
          {Array.isArray(destination.highlights) && destination.highlights.length > 0 ? (
            <>
              {destination.highlights.slice(0, 3).map((highlight, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {highlight}
                </span>
              ))}
              {destination.highlights.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{destination.highlights.length - 3}
                </span>
              )}
            </>
          ) : (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              {t('Sem destaques', 'No highlights')}
            </span>
          )}
        </div>

        {/* Botão de ação */}
        <div className="flex justify-between items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
          >
            {t('Ver detalhes', 'View details')} →
          </button>
          
          <div className="flex items-center gap-2">
            {destination.contacts && destination.contacts.phone && (
              <a
                href={`tel:${destination.contacts.phone}`}
                onClick={(e) => e.stopPropagation()}
                className="text-green-600 hover:text-green-700 transition-colors"
                title={t('Ligar', 'Call')}
              >
                <i className="fa-solid fa-phone text-sm"></i>
              </a>
            )}
            
            {destination.contacts && destination.contacts.whatsapp && (
              <a
                href={`https://wa.me/55${destination.contacts.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-green-600 hover:text-green-700 transition-colors"
                title="WhatsApp"
              >
                <i className="fab fa-whatsapp text-sm"></i>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Modal de detalhes */}
      <DestinationModal
        destination={destination}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}