import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function FavoritesManager() {
  const [favorites, setFavorites] = useState([]);
  const { t } = useLanguage();

  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites);
        // Verificar se é um array válido
        if (Array.isArray(parsedFavorites)) {
          setFavorites(parsedFavorites);
        } else {
          setFavorites([]);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos do localStorage:', error);
      setFavorites([]);
    }
  }, []);

  const addToFavorites = (destination) => {
    // Verificar se destination é válido
    if (!destination || !destination.id) {
      console.error('Destination inválida para adicionar aos favoritos');
      return;
    }
    
    try {
      const newFavorites = [...favorites, destination];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Erro ao adicionar aos favoritos:', error);
    }
  };

  const removeFromFavorites = (destinationId) => {
    // Verificar se destinationId é válido
    if (destinationId === undefined || destinationId === null) {
      console.error('ID de destino inválido para remover dos favoritos');
      return;
    }
    
    try {
      const newFavorites = favorites.filter(fav => fav.id !== destinationId);
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Erro ao remover dos favoritos:', error);
    }
  };

  const isFavorite = (destinationId) => {
    // Verificar se destinationId é válido
    if (destinationId === undefined || destinationId === null) {
      return false;
    }
    
    return favorites.some(fav => fav.id === destinationId);
  };

  const toggleFavorite = (destination) => {
    // Verificar se destination é válido
    if (!destination || !destination.id) {
      console.error('Destination inválida para toggle de favoritos');
      return;
    }
    
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
  // Verificar se destination existe
  if (!destination || !destination.id) {
    return null;
  }
  
  const favoritesManager = FavoritesManager();
  const { isFavorite, toggleFavorite } = favoritesManager;
  const { t } = useLanguage();
  
  // Verificar se as funções existem
  if (!isFavorite || !toggleFavorite) {
    return null;
  }
  
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
      aria-label={isFavorite(destination.id) 
        ? t('Remover dos favoritos', 'Remove from favorites')
        : t('Adicionar aos favoritos', 'Add to favorites')
      }
    >
      <i className={`fa-${isFavorite(destination.id) ? 'solid' : 'regular'} fa-heart`}></i>
    </button>
  );
}