import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MapView from '../components/MapView';
import DestinationList from '../components/DestinationList';
import { DESTINATIONS } from '../data/destinations';
import Navbar from '../components/Navbar';
import { useLanguage } from '../contexts/LanguageContext';

export default function MapPage() {
  const [userPos, setUserPos] = useState(null);
  const [selectedDest, setSelectedDest] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { t } = useLanguage();

  const location = useLocation();

  // Verificar se DESTINATIONS é um array válido
  const validDestinations = Array.isArray(DESTINATIONS) ? DESTINATIONS : [];

  // Se veio um destino via navegação, seleciona-o inicialmente
  useEffect(() => {
    if (location.state?.destId) {
      const dest = validDestinations.find((d) => d.id === location.state.destId);
      if (dest) setSelectedDest(dest);
    }
  }, [location.state]);

  // Geolocalização do usuário
  useEffect(() => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserPos([latitude, longitude]);
        },
        (err) => {
          console.error('Erro ao obter localização', err);
          // Usar posição padrão se não conseguir obter a localização
          setUserPos([-20.463, -55.789]);
        },
      );
    } else {
      // Usar posição padrão se o navegador não suportar geolocalização
      setUserPos([-20.463, -55.789]);
    }
  }, []);

  // Busca rota quando destino ou posição mudam
  useEffect(() => {
    if (!selectedDest || !userPos) return;

    const fetchRoute = async () => {
      const [lat1, lon1] = userPos;
      const { lat: lat2, lon: lon2 } = selectedDest;

      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=full&geometries=geojson`;
        const res = await fetch(url);
        
        // Verificar se a resposta é válida
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();

        if (data && data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          setRouteData({
            distance: route.distance || 0,
            duration: route.duration || 0,
            geometry: route.geometry || null,
          });
        }
      } catch (err) {
        console.error('Erro ao buscar rota', err);
        // Limpar dados da rota em caso de erro
        setRouteData(null);
      }
    };

    fetchRoute();
  }, [selectedDest, userPos]);

  const costKm = 2.5;

  return (
    <div className="flex h-screen bg-gray-100">
      <Navbar variant="map">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded hover:bg-gray-100 transition-colors"
          aria-label={sidebarOpen ? t('Fechar barra lateral', 'Close sidebar') : t('Abrir barra lateral', 'Open sidebar')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Link
          to="/"
          className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
        >
          🏠 {t('Início', 'Home')}
        </Link>
      </Navbar>

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300`}>
        <div className="w-80 h-full bg-white shadow-lg pt-24 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 80px)' }}>
          <DestinationList
            destinations={validDestinations}
            onSelect={setSelectedDest}
            selectedId={selectedDest?.id}
          />
          
          {/* Informações da rota */}
          {selectedDest && (
            <div className="border-t bg-gray-50 p-4 m-4 rounded-lg">
              <h2 className="font-bold text-lg mb-3 text-gray-800">
                <i className="fa-solid fa-location-dot mr-1"></i>{selectedDest.name}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                {selectedDest.fullDescription}
              </p>
              
              {routeData && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800 border-b pb-2">
                    <i className="fa-solid fa-map mr-1"></i>{t('Informações da Rota', 'Route Information')}
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {typeof routeData.distance === 'number' ? (routeData.distance / 1000).toFixed(1) : '0.0'}
                      </div>
                      <div className="text-gray-600">km</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {typeof routeData.duration === 'number' ? Math.round(routeData.duration / 60) : '0'}
                      </div>
                      <div className="text-gray-600">min</div>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <div className="text-xl font-bold text-orange-600">
                      R$ {typeof routeData.distance === 'number' ? ((routeData.distance / 1000) * costKm).toFixed(2) : '0.00'}
                    </div>
                    <div className="text-gray-600 text-sm">{t('Custo estimado (combustível)', 'Estimated cost (fuel)')}</div>
                  </div>
                </div>
              )}
              
              <div className="mt-4 space-y-2">
                <h4 className="font-medium text-gray-800">✨ {t('Destaques:', 'Highlights:')}</h4>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(selectedDest.highlights) && selectedDest.highlights.length > 0 ? (
                    selectedDest.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {highlight}
                      </span>
                    ))
                  ) : (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {t('Sem destaques', 'No highlights')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mapa */}
      <div className="flex-1 pt-10" style={{ height: 'calc(100vh - 40px)' }}>
        <MapView
          userPos={userPos}
          destinations={validDestinations}
          selectedDest={selectedDest}
          routeData={routeData}
          onMarkerClick={setSelectedDest}
        />
      </div>
    </div>
  );
}
