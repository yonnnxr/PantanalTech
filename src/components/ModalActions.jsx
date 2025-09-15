import { useLanguage } from '../contexts/LanguageContext';
import { FavoriteButton } from './FavoritesManager';
import ShareButton from './ShareButton';

export default function ModalActions({ 
  destination, 
  isInRoute, 
  onToggleRoute 
}) {
  const { t } = useLanguage();

  // Verificar se destination existe
  if (!destination) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 ml-4 relative z-10">
      <FavoriteButton destination={destination} />
      <ShareButton destination={destination} />
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (onToggleRoute && typeof onToggleRoute === 'function') {
            onToggleRoute();
          }
        }}
        className={`px-4 py-2 rounded-lg font-medium transition-all ${
          isInRoute 
            ? 'bg-red-500 text-white hover:bg-red-600' 
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
        aria-label={isInRoute 
          ? t('Remover da Rota', 'Remove from Route') 
          : t('Adicionar à Rota', 'Add to Route')
        }
      >
        {isInRoute 
          ? t('Remover da Rota', 'Remove from Route') 
          : t('Adicionar à Rota', 'Add to Route')
        }
      </button>
    </div>
  );
} 