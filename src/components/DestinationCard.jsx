import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useRoute } from '../contexts/RouteContext';
import { FavoriteButton } from './FavoritesManager';
import DestinationModal from './DestinationModal';

export default function DestinationCard({ destination, onSelect, isSelected }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { language, t } = useLanguage();
  const { addDestination, removeDestination, selectedDestinations } = useRoute();

  const isInRoute = selectedDestinations.some(d => d.id === destination.id);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === destination.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? destination.images.length - 1 : prev - 1
    );
  };

  const toggleInRoute = (e) => {
    e.stopPropagation();
    if (isInRoute) {
      removeDestination(destination.id);
    } else {
      addDestination(destination);
    }
  };

  const categoryColors = {
    'Trilhas e ecoturismo': 'bg-green-100 text-green-800',
    'Turismo cultural': 'bg-purple-100 text-purple-800',
    'Gastronomia local': 'bg-orange-100 text-orange-800',
    'Hospedagens e guias credenciados': 'bg-blue-100 text-blue-800',
  };

  const difficultyColors = {
    'Fácil': 'text-green-600',
    'Moderada': 'text-yellow-600',
    'Difícil': 'text-red-600',
    'Easy': 'text-green-600',
    'Moderate': 'text-yellow-600',
    'Hard': 'text-red-600',
  };

  const schedule = language === 'pt' ? destination.schedule : destination.scheduleEn;
  const difficulty = language === 'pt' ? destination.difficulty : destination.difficultyEn;

  return (
    <div
      className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer relative z-20 ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={() => {
        setIsModalOpen(true);
        onSelect && onSelect(destination);
      }}
    >
      {/* Galeria de imagens */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={destination.images[currentImageIndex]}
          alt={language === 'pt' ? destination.name : destination.nameEn}
          className="w-full h-full object-cover"
        />
        
        {/* Navegação da galeria */}
        {destination.images.length > 1 && (
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
              {destination.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Categoria e botão de rota */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[destination.category]}`}>
            <i className={`${destination.icon} mr-1`}></i> {language === 'pt' ? destination.category : destination.categoryEn}
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
          >
            {isInRoute ? '✕' : '+'}
          </button>
        </div>
      </div>

      {/* Conteúdo do card */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          {language === 'pt' ? destination.name : destination.nameEn}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {language === 'pt' ? destination.description : destination.descriptionEn}
        </p>

        {/* Informações básicas */}
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-3">
          <div>
            <span className="font-medium">{t('Duração:', 'Duration:')}</span>
            <br />
            {language === 'pt' ? destination.duration : destination.durationEn}
          </div>
          <div>
            <span className={`font-medium ${difficultyColors[difficulty]}`}>
              ● {difficulty}
            </span>
          </div>
        </div>

        {/* Horários */}
        <div className="text-xs text-gray-500 mb-3">
          <span className="font-medium">{t('Horários:', 'Schedule:')}</span>
          <div>{schedule.weekdays}</div>
          {schedule.closed !== 'Nunca fechado' && schedule.closed !== 'Never closed' && (
            <div className="text-red-500">{t('Fechado:', 'Closed:')} {schedule.closed}</div>
          )}
        </div>

        {/* Contatos */}
        <div className="flex gap-2 mb-3">
          {destination.contacts.whatsapp && (
            <a
              href={`https://wa.me/55${destination.contacts.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600 transition-colors"
            >
              <i className='fa-brands fa-whatsapp'></i>
            </a>
          )}
          {destination.contacts.instagram && (
            <a
              href={`https://instagram.com/${destination.contacts.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 bg-pink-500 text-white px-2 py-1 rounded text-xs hover:bg-pink-600 transition-colors"
            >
              <i className='fa-brands fa-instagram'></i>
            </a>
          )}
          {destination.contacts.phone && (
            <a
              href={`tel:${destination.contacts.phone}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition-colors"
            >
              <i className='fa-solid fa-phone'></i>
            </a>
          )}
        </div>

        {/* Destaques */}
        <div className="flex flex-wrap gap-1">
          {(language === 'pt' ? destination.highlights : destination.highlightsEn)
            .slice(0, 2)
            .map((highlight, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                {highlight}
              </span>
            ))
          }
          {destination.highlights.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{destination.highlights.length - 2}
            </span>
          )}
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