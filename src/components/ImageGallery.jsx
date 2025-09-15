import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function ImageGallery({ images, title, subtitle, category }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const { t } = useLanguage();

  // Verificar se images é um array válido
  const validImages = Array.isArray(images) ? images : [];

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="bg-white rounded-3xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{title || t('Galeria de Imagens', 'Image Gallery')}</h3>
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {validImages.map((image, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => openModal(image)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openModal(image);
                }
              }}
              aria-label={`${t('Abrir imagem', 'Open image')} ${index + 1}`}
            >
              <img 
                src={image} 
                alt={`${category || t('Categoria', 'Category')} ${index + 1}`}
                className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  // Imagem de fallback caso a imagem não carregue
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbSBuw6NvIGRpcG9uw608L3RleHQ+PC9zdmc+';
                }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              <div className="absolute top-2 right-2 bg-white/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <i className="fa-solid fa-expand text-gray-600 text-xs"></i>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Imagem */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={t('Visualizador de imagem', 'Image viewer')}
        >
          <div className="relative max-w-4xl max-h-full">
            <img 
              src={selectedImage} 
              alt={t('Imagem ampliada', 'Enlarged image')}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors duration-300"
              aria-label={t('Fechar', 'Close')}
            >
              <i className="fa-solid fa-times text-xl"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
} 