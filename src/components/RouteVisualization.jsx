import { useEffect } from 'react';
import { useMap, Polyline } from 'react-leaflet';
import { useRoute } from '../contexts/RouteContext';

function FitBounds({ routeData }) {
  const map = useMap();

  useEffect(() => {
    if (routeData && routeData.geometry) {
      const coordinates = routeData.geometry.coordinates;
      if (coordinates.length > 0) {
        // Converter coordenadas [lon, lat] para [lat, lon] para Leaflet
        const bounds = coordinates.map(coord => [coord[1], coord[0]]);
        map.fitBounds(bounds, { padding: [20, 20] });
      }
    }
  }, [map, routeData]);

  return null;
}

export default function RouteVisualization({ userPos, routeData }) {
  const { selectedDestinations } = useRoute();

  if (!routeData || !routeData.geometry) return null;

  return (
    <>
      {/* Linha da rota principal */}
      <Polyline
        positions={routeData.geometry.coordinates.map(([lon, lat]) => [lat, lon])}
        color="#3B82F6"
        weight={4}
        opacity={0.8}
        dashArray="0"
      />
      
      {/* Linhas pontilhadas conectando pontos de interesse */}
      {selectedDestinations.length > 1 && (
        <>
          {selectedDestinations.map((dest, index) => {
            if (index === 0) return null;
            const prevDest = selectedDestinations[index - 1];
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