import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MapView from '../components/MapView';
import DestinationList from '../components/DestinationList';
import { DESTINATIONS } from '../data/destinations';
import Navbar from '../components/Navbar';

export default function MapPage() {
  const [userPos, setUserPos] = useState(null);
  const [selectedDest, setSelectedDest] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const location = useLocation();

  // Se veio um destino via navegação, seleciona-o inicialmente
  useEffect(() => {
    if (location.state?.destId) {
      const dest = DESTINATIONS.find((d) => d.id === location.state.destId);
      if (dest) setSelectedDest(dest);
    }
  }, [location.state]);

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
    );
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
        const data = await res.json();

        if (data.routes && data.routes.length) {
          const route = data.routes[0];
          setRouteData({
            distance: route.distance,
            duration: route.duration,
            geometry: route.geometry,
          });
        }
      } catch (err) {
        console.error('Erro ao buscar rota', err);
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
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Link
          to="/"
          className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
        >
          🏠 Início
        </Link>
      </Navbar>

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300`}>
        <div className="w-80 h-full bg-white shadow-lg pt-24 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 80px)' }}>
          <DestinationList
            destinations={DESTINATIONS || []}
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
                    <i className="fa-solid fa-map mr-1"></i>Informações da Rota
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {(routeData.distance / 1000).toFixed(1)}
                      </div>
                      <div className="text-gray-600">km</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {Math.round(routeData.duration / 60)}
                      </div>
                      <div className="text-gray-600">min</div>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <div className="text-xl font-bold text-orange-600">
                      R$ {((routeData.distance / 1000) * costKm).toFixed(2)}
                    </div>
                    <div className="text-gray-600 text-sm">Custo estimado (combustível)</div>
                  </div>
                </div>
              )}
              
              <div className="mt-4 space-y-2">
                <h4 className="font-medium text-gray-800">✨ Destaques:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDest.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
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
          destinations={DESTINATIONS}
          selectedDest={selectedDest}
          routeData={routeData}
          onMarkerClick={setSelectedDest}
        />
      </div>
    </div>
  );
}
