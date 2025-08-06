import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import DestinationModal from './DestinationModal';
import MapControls from './MapControls';
import MapLoading from './MapLoading';
import { Z_INDEX } from '../utils/zIndex';

export default function InteractiveMap({ 
  destinations, 
  userPos, 
  selectedDest, 
  onMarkerClick, 
  routeData,
  className = "h-96 w-full"
}) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const routeLayerRef = useRef(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const { language, t } = useLanguage();

  useEffect(() => {
    // Verificar se o Leaflet já foi carregado
    if (window.L) {
      initMap();
      return;
    }

    // Carregar Leaflet CSS dinamicamente
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.crossOrigin = '';
    document.head.appendChild(link);

    // Carregar Leaflet JS dinamicamente
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.crossOrigin = '';
    script.onload = initMap;
    script.onerror = () => {
      console.error('Erro ao carregar Leaflet');
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, []);

  const initMap = () => {
    if (!mapRef.current || mapInstanceRef.current) return;

    try {
      // Inicializar mapa
      const map = L.map(mapRef.current).setView([-20.4701, -55.7864], 10);
      mapInstanceRef.current = map;

      // Adicionar tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Adicionar marcadores
      addMarkers();
      
      setIsMapLoading(false);
    } catch (error) {
      console.error('Erro ao inicializar mapa:', error);
      setIsMapLoading(false);
    }
  };

  const addMarkers = () => {
    if (!mapInstanceRef.current) return;

    // Limpar marcadores existentes
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Adicionar marcador do usuário
    if (userPos) {
      const userMarker = L.marker(userPos, {
        icon: L.divIcon({
          className: 'user-marker',
          html: '<div class="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>',
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        })
      }).addTo(mapInstanceRef.current);
      
      markersRef.current.push(userMarker);
    }

    // Adicionar marcadores dos destinos
    destinations.forEach(dest => {
      const isSelected = selectedDest && selectedDest.id === dest.id;
      
      const marker = L.marker([dest.lat, dest.lon], {
        icon: L.divIcon({
          className: 'destination-marker',
          html: `
            <div class="w-8 h-8 bg-white rounded-full border-2 border-blue-500 shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform ${
              isSelected ? 'ring-2 ring-yellow-400' : ''
            }">
              <i class="fa-solid ${dest.icon.replace('fa-solid ', '')} text-blue-600 text-sm"></i>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        })
      }).addTo(mapInstanceRef.current);

      marker.on('click', () => {
        console.log('Marcador clicado:', dest.name);
        setSelectedDestination(dest);
        onMarkerClick && onMarkerClick(dest);
        console.log('Modal aberto para:', dest.name);
      });

      markersRef.current.push(marker);
    });
  };

  // Atualizar marcadores quando destinations ou selectedDest mudam
  useEffect(() => {
    if (mapInstanceRef.current) {
      addMarkers();
    }
  }, [destinations, selectedDest, userPos]);

  // Fechar modal quando selectedDestination muda
  useEffect(() => {
    if (!selectedDestination) {
      // Modal será fechado automaticamente
    }
  }, [selectedDestination]);

  const updateRoute = () => {
    if (!mapInstanceRef.current || !routeData) return;

    // Remover rota anterior
    if (routeLayerRef.current) {
      mapInstanceRef.current.removeLayer(routeLayerRef.current);
    }

    // Adicionar nova rota
    const routeLayer = L.geoJSON(routeData.geometry, {
      style: {
        color: '#3B82F6',
        weight: 4,
        opacity: 0.8
      }
    }).addTo(mapInstanceRef.current);

    routeLayerRef.current = routeLayer;

    // Ajustar view para mostrar toda a rota
    if (routeData.geometry.coordinates.length > 0) {
      const bounds = L.latLngBounds(routeData.geometry.coordinates.map(coord => [coord[1], coord[0]]));
      mapInstanceRef.current.fitBounds(bounds, { padding: [20, 20] });
    }
  };

  // Atualizar marcadores quando destinos mudam
  useEffect(() => {
    if (mapInstanceRef.current) {
      addMarkers();
    }
  }, [destinations, selectedDest, userPos]);

  // Atualizar rota quando routeData muda
  useEffect(() => {
    if (mapInstanceRef.current) {
      updateRoute();
    }
  }, [routeData]);

  return (
    <>
      <div 
        className={`${className} relative`}
        style={{ zIndex: Z_INDEX.CONTENT }}
        ref={mapRef}
      >
        {/* Loading overlay */}
        <MapLoading isMapLoading={isMapLoading} />

        {/* Controles do mapa */}
        <MapControls 
          onZoomIn={() => mapInstanceRef.current?.zoomIn()}
          onZoomOut={() => mapInstanceRef.current?.zoomOut()}
          routeData={routeData}
        />
      </div>

      {/* Modal de detalhes do destino */}
      {selectedDestination && (
        <DestinationModal
          destination={selectedDestination}
          isOpen={!!selectedDestination}
          onClose={() => {
            console.log('Fechando modal do mapa');
            setSelectedDestination(null);
          }}
        />
      )}
    </>
  );
}