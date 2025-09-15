import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Corrige caminho dos ícones padrão do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export default function MapView({ userPos, destinations, selectedDest, routeData, onMarkerClick }) {
  // Verificar se userPos é válido
  const isValidUserPos = userPos && Array.isArray(userPos) && userPos.length === 2 && 
                         typeof userPos[0] === 'number' && typeof userPos[1] === 'number';
  
  // Usar posição padrão se userPos não for válida
  const center = isValidUserPos ? userPos : [-20.463, -55.789];

  // Verificar se destinations é um array válido
  const validDestinations = Array.isArray(destinations) ? destinations : [];

  return (
    <div style={{ height: '100%', width: '100%', minHeight: '400px' }}>
      <MapContainer 
        center={center} 
        zoom={10} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {isValidUserPos && (
          <Marker position={userPos}>
            <Popup>Sua localização</Popup>
          </Marker>
        )}

        {validDestinations.map((dest) => {
          // Verificar se as coordenadas são válidas
          if (typeof dest.lat !== 'number' || typeof dest.lon !== 'number') {
            return null;
          }
          
          return (
            <Marker
              key={dest.id}
              position={[dest.lat, dest.lon]}
              eventHandlers={{
                click: () => {
                  if (onMarkerClick && typeof onMarkerClick === 'function') {
                    onMarkerClick(dest);
                  }
                },
              }}
            >
              <Popup>
                <strong>{dest.name}</strong>
                <br />
                {dest.description}
              </Popup>
            </Marker>
          );
        })}

        {routeData && routeData.geometry && routeData.geometry.coordinates && (
          <Polyline
            positions={routeData.geometry.coordinates.map(([lon, lat]) => [lat, lon])}
            color="blue"
            weight={4}
            opacity={0.8}
          />
        )}
      </MapContainer>
    </div>
  );
}
