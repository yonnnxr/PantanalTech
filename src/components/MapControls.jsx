import { useLanguage } from '../contexts/LanguageContext';

export default function MapControls({ onZoomIn, onZoomOut, routeData }) {
  const { t } = useLanguage();

  return (
    <>
      {/* Controles de zoom */}
      <div className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-lg p-2">
        <button
          onClick={() => {
            if (onZoomIn && typeof onZoomIn === 'function') {
              onZoomIn();
            }
          }}
          className="block w-8 h-8 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors mb-1"
          title={t('Zoom in', 'Zoom in')}
          aria-label={t('Zoom in', 'Zoom in')}
        >
          <i className="fa-solid fa-plus text-gray-600"></i>
        </button>
        <button
          onClick={() => {
            if (onZoomOut && typeof onZoomOut === 'function') {
              onZoomOut();
            }
          }}
          className="block w-8 h-8 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          title={t('Zoom out', 'Zoom out')}
          aria-label={t('Zoom out', 'Zoom out')}
        >
          <i className="fa-solid fa-minus text-gray-600"></i>
        </button>
      </div>

      {/* Informações da rota */}
      {routeData && typeof routeData === 'object' && routeData.distance && routeData.duration && (
        <div className="absolute bottom-4 left-4 z-10 bg-white rounded-lg shadow-lg p-3 max-w-xs">
          <h4 className="font-semibold text-gray-800 mb-2">
            <i className="fa-solid fa-route mr-2 text-blue-600"></i>
            {t('Informações da Rota', 'Route Information')}
          </h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <div className="font-bold text-blue-600">
                {typeof routeData.distance === 'number' ? (routeData.distance / 1000).toFixed(1) : '0.0'} km
              </div>
              <div className="text-gray-500">{t('Distância', 'Distance')}</div>
            </div>
            <div>
              <div className="font-bold text-green-600">
                {typeof routeData.duration === 'number' ? Math.round(routeData.duration / 60) : '0'} min
              </div>
              <div className="text-gray-500">{t('Duração', 'Duration')}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 