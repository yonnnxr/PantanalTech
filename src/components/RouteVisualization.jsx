import { useEffect } from 'react';
import { useMap, Polyline } from 'react-leaflet';
import { useRoute } from '../contexts/RouteContext';

function FitBounds({ routeData }) {
  const map = useMap();

  useEffect(() => {
    // Verificar se routeData e geometry são válidos
    if (routeData && routeData.geometry && Array.isArray(routeData.geometry.coordinates)) {
      const coordinates = routeData.geometry.coordinates;
      if (coordinates.length > 0) {
        try {
          // Converter coordenadas [lon, lat] para [lat, lon] para Leaflet
          const bounds = coordinates.map(coord => {
            // Verificar se coord é um array válido com pelo menos 2 elementos
            if (Array.isArray(coord) && coord.length >= 2) {
              return [coord[1], coord[0]];
            }
            return null;
          }).filter(coord => coord !== null); // Remover coordenadas inválidas
          
          if (bounds.length > 0) {
            map.fitBounds(bounds, { padding: [20, 20] });
          }
        } catch (error) {
          console.error('Erro ao ajustar limites do mapa:', error);
        }
      }
    }
  }, [map, routeData]);

  return null;
}

export default function RouteVisualization({ userPos, routeData }) {
  const { selectedDestinations } = useRoute();

  // Verificar se routeData e geometry são válidos
  if (!routeData || !routeData.geometry || !Array.isArray(routeData.geometry.coordinates)) {
    return null;
  }

  // Verificar se selectedDestinations é um array válido
  const validSelectedDestinations = Array.isArray(selectedDestinations) ? selectedDestinations : [];

  return (
    <>
      {/* Linha da rota principal */}
      <Polyline
        positions={routeData.geometry.coordinates.map(([lon, lat]) => {
          // Verificar se as coordenadas são números válidos
          if (typeof lon === 'number' && typeof lat === 'number') {
            return [lat, lon];
          }
          return null;
        }).filter(pos => pos !== null)} // Remover posições inválidas
        color="#3B82F6"
        weight={4}
        opacity={0.8}
        dashArray="0"
      />
      
      {/* Linhas pontilhadas conectando pontos de interesse */}
      {validSelectedDestinations.length > 1 && (
        <>
          {validSelectedDestinations.map((dest, index) => {
            // Verificar se dest e as coordenadas são válidas
            if (index === 0 || !dest || typeof dest.lat !== 'number' || typeof dest.lon !== 'number') {
              return null;
            }
            
            const prevDest = validSelectedDestinations[index - 1];
            // Verificar se prevDest e as coordenadas são válidas
            if (!prevDest || typeof prevDest.lat !== 'number' || typeof prevDest.lon !== 'number') {
              return null;
            }
            
            return (
              <Polyline
                key={`connection-${dest.id}`}
                positions={[
                  [prevDest.lat, prevDest.lon],
                  [dest.lat, dest.lon]
                ]}
                color="#10B981"
                weight={2}
                opacity={0.6}
                dashArray="5, 10"
              />
            );
          })}
        </>
      )}

      {/* Ajuste automático do zoom para mostrar toda a rota */}
      <FitBounds routeData={routeData} />
    </>
  );
}