import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import RouteVisualization from './RouteVisualization';
import DestinationModal from './DestinationModal';
import { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLanguage } from '../contexts/LanguageContext';

// Corrige caminho dos ícones padrão do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Ícones personalizados para diferentes categorias
const createCustomIcon = (iconClass, color = '#3B82F6') => {
  return L.divIcon({
    html: `<div style="
      background-color: ${color};
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      color: white;
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    "><i class='${iconClass}'></i></div>`,
    className: 'custom-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

// Componente para centralizar o mapa na posição do usuário
function CenterMapButton({ userPos }) {
  const map = useMap();
  const { t } = useLanguage();

  const centerOnUser = () => {
    if (userPos) {
      map.flyTo(userPos, 13, { duration: 1.5 });
    }
  };

  if (!userPos) return null;

  return (
    <div className="leaflet-top leaflet-right">
      <div className="leaflet-control leaflet-bar">
        <button
          onClick={centerOnUser}
          className="bg-white hover:bg-gray-50 p-2 text-gray-700 border-none cursor-pointer"
          title={t('Centralizar na minha localização', 'Center on my location')}
          aria-label={t('Centralizar na minha localização', 'Center on my location')}
        >
          <i class='fa-solid fa-crosshairs'></i>
        </button>
      </div>
    </div>
  );
}

export default function InteractiveMap({ destinations, onMarkerClick, className = "h-96", routeData }) {
  const [userPos, setUserPos] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { language, t } = useLanguage();

  // Geolocalização do usuário
  useEffect(() => {
    if (!navigator.geolocation) return;
    
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserPos([latitude, longitude]);
      },
      (err) => {
        console.error('Erro ao obter localização', err);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutos
      }
    );
  }, []);

  const center = userPos ?? [-20.463, -55.789]; // Aquidauana como fallback

  const getCategoryColor = (category) => {
    const colors = {
      'Trilhas e ecoturismo': '#10B981', // Verde
      'Turismo cultural': '#8B5CF6', // Roxo
      'Gastronomia local': '#F59E0B', // Amarelo
      'Hospedagens e guias credenciados': '#EF4444', // Vermelho
    };
    return colors[category] || '#3B82F6';
  };

  return (
    <div className={`${className} relative z-10`}>
      <MapContainer
        center={center}
        zoom={userPos ? 13 : 10}
        className="h-full w-full rounded-lg shadow-lg z-0"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <CenterMapButton userPos={userPos} />

        {/* Marcador da posição do usuário */}
        {userPos && (
          <Marker 
            position={userPos}
            icon={createCustomIcon('fa-solid fa-location-dot', '#EF4444')}
          >
            <Popup>
              <div className="text-center">
                <strong>{t('Você está aqui', 'You are here')}</strong>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Marcadores dos destinos */}
        {destinations.map((dest) => (
          <Marker
            key={dest.id}
            position={[dest.lat, dest.lon]}
            icon={createCustomIcon(dest.icon, getCategoryColor(language === 'pt' ? dest.category : dest.categoryEn))}
            eventHandlers={{
              click: () => {
                setSelectedDestination(dest);
                setIsModalOpen(true);
                onMarkerClick && onMarkerClick(dest);
              },
            }}
          >
            <Popup maxWidth={300}>
              <div className="p-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{dest.icon}</span>
                  <strong className="text-lg">
                    {language === 'pt' ? dest.name : dest.nameEn}
                  </strong>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">
                  {language === 'pt' ? dest.description : dest.descriptionEn}
                </p>
                
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-3">
                  <div>
                    <span className="font-medium">
                      {t('Duração:', 'Duration:')}
                    </span>
                    <br />
                    {language === 'pt' ? dest.duration : dest.durationEn}
                  </div>
                  <div>
                    <span className="font-medium">
                      {t('Dificuldade:', 'Difficulty:')}
                    </span>
                    <br />
                    {language === 'pt' ? dest.difficulty : dest.difficultyEn}
                  </div>
                </div>

                {dest.contacts.whatsapp && (
                  <a
                    href={`https://wa.me/55${dest.contacts.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors"
                  >
                    📱 WhatsApp
                  </a>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Visualização da rota */}
        <RouteVisualization userPos={userPos} routeData={routeData} />
      </MapContainer>

      {/* Modal de detalhes do destino */}
      <DestinationModal
        destination={selectedDestination}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}