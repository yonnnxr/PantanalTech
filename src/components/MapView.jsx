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
  const center = userPos ?? [-20.463, -55.789];

  return (
    <div style={{ height: '100%', width: '100%', minHeight: '400px' }}>
      <MapContainer 
        center={center} 
        zoom={10} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {userPos && (
          <Marker position={userPos}>
            <Popup>Sua localização</Popup>
          </Marker>
        )}

        {destinations && destinations.map((dest) => (
          <Marker
            key={dest.id}
            position={[dest.lat, dest.lon]}
            eventHandlers={{
              click: () => onMarkerClick(dest),
            }}
          >
            <Popup>
              <strong>{dest.name}</strong>
              <br />
              {dest.description}
            </Popup>
          </Marker>
        ))}

        {routeData && (
          <Polyline
            positions={routeData.geometry.coordinates.map(([lon, lat]) => [lat, lon])}
            color="blue"
          />
        )}
      </MapContainer>
    </div>
  );
}
