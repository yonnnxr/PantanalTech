import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function FavoritesManager() {
  const [favorites, setFavorites] = useState([]);
  const { t } = useLanguage();

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const addToFavorites = (destination) => {
    const newFavorites = [...favorites, destination];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (destinationId) => {
    const newFavorites = favorites.filter(fav => fav.id !== destinationId);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (destinationId) => {
    return favorites.some(fav => fav.id === destinationId);
  };

  const toggleFavorite = (destination) => {
    if (isFavorite(destination.id)) {
      removeFromFavorites(destination.id);
    } else {
      addToFavorites(destination);
    }
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite
  };
}

export function FavoriteButton({ destination, className = "" }) {
  const { isFavorite, toggleFavorite } = FavoritesManager();
  const { t } = useLanguage();
  
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(destination);
      }}
      className={`p-2 rounded-full transition-all ${className} ${
        isFavorite(destination.id)
          ? 'text-red-500 hover:text-red-600'
          : 'text-gray-400 hover:text-red-500'
      }`}
      title={isFavorite(destination.id) 
        ? t('Remover dos favoritos', 'Remove from favorites')
        : t('Adicionar aos favoritos', 'Add to favorites')
      }
    >
      <i className={`fa-${isFavorite(destination.id) ? 'solid' : 'regular'} fa-heart`}></i>
    </button>
  );
}