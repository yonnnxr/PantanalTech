import { useLanguage } from '../contexts/LanguageContext';

export default function MapLoading({ isMapLoading }) {
  const { t } = useLanguage();

  // Verificar se isMapLoading é verdadeiro
  if (!isMapLoading) return null;

  return (
    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin inline-block w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mb-2"></div>
        <p className="text-gray-600">{t('Carregando mapa...', 'Loading map...')}</p>
      </div>
    </div>
  );
} 