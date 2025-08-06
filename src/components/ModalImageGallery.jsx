import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function ModalImageGallery({ destination, currentImageIndex, onImageChange }) {
  const { t } = useLanguage();

  const nextImage = () => {
    onImageChange((prev) => 
      prev === destination.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    onImageChange((prev) => 
      prev === 0 ? destination.images.length - 1 : prev - 1
    );
  };

  if (!destination.images || destination.images.length === 0) {
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
        src={destination.images[currentImageIndex]}
        alt={`${destination.name} - Imagem ${currentImageIndex + 1}`}
        className="w-full h-full object-cover"
      />

      {/* Botões de navegação */}
      {destination.images.length > 1 && (
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
            {destination.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  onImageChange(index);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
} 