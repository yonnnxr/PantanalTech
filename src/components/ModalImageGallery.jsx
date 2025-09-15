import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function ModalImageGallery({ destination, currentImageIndex, onImageChange }) {
  const { t } = useLanguage();

  // Verificar se destination existe
  if (!destination) {
    return (
      <div className="relative h-64 md:h-80 bg-gray-200 flex items-center justify-center">
        <div className="text-gray-500">
          <i className="fa-solid fa-image text-4xl mb-2"></i>
          <p className="text-sm">{t('Nenhuma imagem disponível', 'No images available')}</p>
        </div>
      </div>
    );
  }

  // Verificar se destination.images existe e é um array
  const validImages = Array.isArray(destination.images) ? destination.images : [];
  
  // Verificar se currentImageIndex é válido
  const validCurrentImageIndex = typeof currentImageIndex === 'number' && 
                                currentImageIndex >= 0 && 
                                currentImageIndex < validImages.length ? 
                                currentImageIndex : 0;

  const nextImage = () => {
    if (validImages.length === 0) return;
    
    const nextIndex = validCurrentImageIndex === validImages.length - 1 ? 0 : validCurrentImageIndex + 1;
    if (onImageChange && typeof onImageChange === 'function') {
      onImageChange(nextIndex);
    }
  };

  const prevImage = () => {
    if (validImages.length === 0) return;
    
    const prevIndex = validCurrentImageIndex === 0 ? validImages.length - 1 : validCurrentImageIndex - 1;
    if (onImageChange && typeof onImageChange === 'function') {
      onImageChange(prevIndex);
    }
  };

  if (validImages.length === 0) {
    return (
      <div className="relative h-64 md:h-80 bg-gray-200 flex items-center justify-center">
        <div className="text-gray-500">
          <i className="fa-solid fa-image text-4xl mb-2"></i>
          <p className="text-sm">{t('Nenhuma imagem disponível', 'No images available')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-64 md:h-80 overflow-hidden">
      {/* Imagem principal */}
      <img
        src={validImages[validCurrentImageIndex]}
        alt={`${destination.name || 'Destino'} - Imagem ${validCurrentImageIndex + 1}`}
        className="w-full h-full object-cover"
        onError={(e) => {
          // Imagem de fallback caso a imagem não carregue
          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbSBuw6NvIGRpcG9uw608L3RleHQ+PC9zdmc+';
        }}
      />

      {/* Botões de navegação */}
      {validImages.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all z-10"
            aria-label={t('Imagem anterior', 'Previous image')}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all z-10"
            aria-label={t('Próxima imagem', 'Next image')}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {validImages.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onImageChange && typeof onImageChange === 'function') {
                    onImageChange(index);
                  }
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === validCurrentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
                aria-label={`${t('Ir para imagem', 'Go to image')} ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
} 