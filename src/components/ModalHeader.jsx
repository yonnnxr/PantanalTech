import { useLanguage } from '../contexts/LanguageContext';
import ModalImageGallery from './ModalImageGallery';

export default function ModalHeader({ 
  destination, 
  currentImageIndex, 
  onImageChange, 
  onClose 
}) {
  const { language, t } = useLanguage();

  return (
    <div className="relative h-64 md:h-80">
      <ModalImageGallery 
        destination={destination}
        currentImageIndex={currentImageIndex}
        onImageChange={onImageChange}
      />

      {/* Botão fechar */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all z-10"
      >
        <i className="fa-solid fa-times"></i>
      </button>

      {/* Categoria */}
      <div className="absolute top-4 left-4 z-10">
        <span className="px-3 py-1 bg-black bg-opacity-50 text-white rounded-full text-sm">
          <i className={`${destination.icon} mr-1`}></i>
          {language === 'pt' ? destination.category : destination.categoryEn}
        </span>
      </div>
    </div>
  );
} 