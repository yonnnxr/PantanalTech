import { useState, useEffect } from 'react';
import { useRoute } from '../contexts/RouteContext';
import { useLanguage } from '../contexts/LanguageContext';
import TransportModeSelector from './TransportModeSelector';
import { Z_INDEX } from '../utils/zIndex';

// Função para calcular rota otimizada (algoritmo simples do vizinho mais próximo)
const optimizeRoute = (destinations, startPoint) => {
  // Verificar se os parâmetros são válidos
  if (!destinations || destinations.length <= 1) return destinations || [];
  
  // Verificar se startPoint é válido
  if (!startPoint || !Array.isArray(startPoint) || startPoint.length !== 2) {
    return destinations;
  }
  
  const unvisited = [...destinations];
  const optimized = [];
  let current = startPoint;

  while (unvisited.length > 0) {
    let nearestIndex = 0;
    let nearestDistance = Infinity;

    unvisited.forEach((dest, index) => {
      // Verificar se as coordenadas do destino são válidas
      if (typeof dest.lat !== 'number' || typeof dest.lon !== 'number') {
        return;
      }
      
      const distance = Math.sqrt(
        Math.pow(current[0] - dest.lat, 2) + Math.pow(current[1] - dest.lon, 2)
      );
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    const nearest = unvisited.splice(nearestIndex, 1)[0];
    if (nearest) {
      optimized.push(nearest);
      current = [nearest.lat, nearest.lon];
    } else {
      break;
    }
  }

  return optimized;
};

// Função para calcular rota usando OSRM
const calculateRouteData = async (waypoints, transportMode) => {
  // Verificar se os parâmetros são válidos
  if (!waypoints || waypoints.length < 2) return null;
  
  // Verificar se todos os waypoints são válidos
  const validWaypoints = waypoints.filter(point => 
    Array.isArray(point) && point.length === 2 && 
    typeof point[0] === 'number' && typeof point[1] === 'number'
  );
  
  if (validWaypoints.length < 2) return null;

  try {
    const coordinates = validWaypoints.map(point => `${point[1]},${point[0]}`).join(';');
    const profile = transportMode === 'cycling' ? 'cycling' : 
                   transportMode === 'walking' ? 'foot' : 'driving';
    const url = `https://router.project-osrm.org/route/v1/${profile}/${coordinates}?overview=full&geometries=geojson&steps=true`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // Verificar se a resposta é válida
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();

    if (data && data.routes && data.routes.length > 0) {
      const route = data.routes[0];
      return {
        distance: route.distance || 0,
        duration: route.duration || 0,
        geometry: route.geometry || null,
        steps: route.legs ? route.legs.flatMap(leg => leg.steps || []) : []
      };
    }
  } catch (error) {
    console.error('Erro ao calcular rota:', error);
  }
  
  return null;
};

export default function RouteBuilder({ userPos }) {
  const { 
    selectedDestinations, 
    transportMode, 
    setTransportMode, 
    multiRouteData, 
    setMultiRouteData,
    clearDestinations,
    reorderDestinations 
  } = useRoute();
  
  const { language, t } = useLanguage();
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  // Recalcula rota quando destinos ou modo de transporte mudam
  useEffect(() => {
    // Verificar se userPos é válido antes de calcular a rota
    const isValidUserPos = userPos && Array.isArray(userPos) && userPos.length === 2 && 
                          typeof userPos[0] === 'number' && typeof userPos[1] === 'number';
    
    if (selectedDestinations.length >= 2 && isValidUserPos) {
      calculateFullRoute();
    } else {
      setMultiRouteData(null);
    }
  }, [selectedDestinations, transportMode, userPos]);

  const calculateFullRoute = async () => {
    // Verificar se userPos é válido
    const isValidUserPos = userPos && Array.isArray(userPos) && userPos.length === 2 && 
                          typeof userPos[0] === 'number' && typeof userPos[1] === 'number';
    
    if (!isValidUserPos || selectedDestinations.length < 2) return;
    
    setIsCalculating(true);
    
    try {
      // Criar waypoints incluindo posição do usuário
      const waypoints = [
        userPos,
        ...selectedDestinations.map(dest => [dest.lat, dest.lon]).filter(coord => 
          Array.isArray(coord) && coord.length === 2 && 
          typeof coord[0] === 'number' && typeof coord[1] === 'number'
        )
      ];

      // Verificar se temos pelo menos 2 waypoints válidos
      if (waypoints.length < 2) {
        setIsCalculating(false);
        return;
      }

      const routeData = await calculateRouteData(waypoints, transportMode);
      
      if (routeData) {
        // Calcular custos baseados no modo de transporte
        const costPerKm = {
          driving: 2.5,   // Combustível
          cycling: 0,     // Sem custo
          walking: 0      // Sem custo
        };

        const totalCost = (routeData.distance / 1000) * (costPerKm[transportMode] || 0);
        
        setMultiRouteData({
          ...routeData,
          totalCost,
          waypoints,
          destinations: selectedDestinations
        });
      } else {
        // Se não conseguir calcular a rota, limpar os dados
        setMultiRouteData(null);
      }
    } catch (error) {
      console.error('Erro ao calcular rota completa:', error);
      setMultiRouteData(null);
    } finally {
      setIsCalculating(false);
    }
  };

  const optimizeRouteOrder = async () => {
    // Verificar se userPos é válido
    const isValidUserPos = userPos && Array.isArray(userPos) && userPos.length === 2 && 
                          typeof userPos[0] === 'number' && typeof userPos[1] === 'number';
    
    if (!isValidUserPos || selectedDestinations.length < 2) return;
    
    setIsOptimizing(true);
    
    try {
      // Otimizar ordem dos destinos
      const optimized = optimizeRoute(selectedDestinations, userPos);
      if (reorderDestinations && typeof reorderDestinations === 'function') {
        reorderDestinations(optimized);
      }
    } catch (error) {
      console.error('Erro ao otimizar rota:', error);
    } finally {
      setIsOptimizing(false);
    }
  };

  const formatDuration = (seconds) => {
    // Verificar se seconds é um número válido
    if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) {
      return '0min';
    }
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}min`;
    }
    return `${minutes}min`;
  };

  const getSuggestedStops = () => {
    // Verificar se multiRouteData é válido
    if (!multiRouteData || typeof multiRouteData.duration !== 'number' || 
        multiRouteData.duration < 7200) return []; // Menos de 2 horas
    
    return [
      t('Parada para lanche (1h)', 'Snack break (1h)'),
      t('Parada para fotos (30min)', 'Photo break (30min)'),
      t('Parada para descanso (20min)', 'Rest break (20min)')
    ];
  };

  // Verificar se selectedDestinations é um array válido
  const validSelectedDestinations = Array.isArray(selectedDestinations) ? selectedDestinations : [];

  if (validSelectedDestinations.length === 0) {
    return (
      <div 
        className="bg-white p-6 rounded-lg shadow-sm border text-center"
        style={{ zIndex: Z_INDEX.CONTENT }}
      >
        <div className="text-gray-400 text-4xl mb-4"><i className="fa-solid fa-location-dot"></i></div>
        <h3 className="font-semibold text-gray-800 mb-2">
          {t('Monte sua Rota', 'Build your Route')}
        </h3>
        <p className="text-gray-600 text-sm">
          {t(
            'Selecione pontos turísticos nos cards acima para criar sua rota personalizada',
            'Select tourist spots in the cards above to create your personalized route'
          )}
        </p>
      </div>
    );
  }

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border overflow-hidden"
      style={{ zIndex: Z_INDEX.CONTENT }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg">
            <i className="fa-solid fa-list-ul mr-2"></i>{t('Sua Rota Personalizada', 'Your Custom Route')}
          </h3>
          <button
            onClick={() => {
              if (clearDestinations && typeof clearDestinations === 'function') {
                clearDestinations();
              }
            }}
            className="text-white hover:text-red-200 transition-colors"
            aria-label={t('Limpar rota', 'Clear route')}
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Seletor de transporte */}
        <TransportModeSelector 
          selectedMode={transportMode}
          onModeChange={(mode) => {
            if (setTransportMode && typeof setTransportMode === 'function') {
              setTransportMode(mode);
            }
          }}
        />

        {/* Lista de destinos */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-800">
              {t('Destinos selecionados', 'Selected destinations')} ({validSelectedDestinations.length})
            </h4>
            {validSelectedDestinations.length >= 2 && (
              <button
                onClick={optimizeRouteOrder}
                disabled={isOptimizing}
                className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition-colors disabled:opacity-50"
              >
                {isOptimizing ? <i className="fa-solid fa-spinner fa-spin mr-1"></i> : <i className="fa-solid fa-arrows-rotate mr-1"></i>} {t('Otimizar', 'Optimize')}
              </button>
            )}
          </div>

          <div className="space-y-2">
            {/* Ponto de partida */}
            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <i className="fa-solid fa-location-dot text-green-600"></i>
              <div className="flex-1">
                <div className="font-medium text-green-800">
                  {t('Ponto de partida', 'Starting point')}
                </div>
                <div className="text-sm text-green-600">
                  {t('Sua localização atual', 'Your current location')}
                </div>
              </div>
            </div>

            {/* Destinos */}
            {validSelectedDestinations.map((dest, index) => (
              <div key={dest.id} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <span className="text-blue-600 font-bold">{index + 1}</span>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">
                    {language === 'pt' ? dest.name : dest.nameEn}
                  </div>
                  <div className="text-sm text-gray-600">
                    {language === 'pt' ? dest.duration : dest.durationEn}
                  </div>
                </div>
                <span className="text-xl">{dest.icon}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Informações da rota */}
        {multiRouteData && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-3">
              <i className="fa-solid fa-chart-line mr-1"></i>{t('Resumo da Rota', 'Route Summary')}
            </h4>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {typeof multiRouteData.distance === 'number' ? (multiRouteData.distance / 1000).toFixed(1) : '0.0'}
                </div>
                <div className="text-sm text-gray-600">km</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {formatDuration(multiRouteData.duration)}
                </div>
                <div className="text-sm text-gray-600">
                  {t('duração', 'duration')}
                </div>
              </div>
            </div>

            {typeof multiRouteData.totalCost === 'number' && multiRouteData.totalCost > 0 && (
              <div className="text-center mb-4">
                <div className="text-xl font-bold text-orange-600">
                  R$ {multiRouteData.totalCost.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">
                  {t('custo estimado', 'estimated cost')}
                </div>
              </div>
            )}

            {/* Paradas sugeridas */}
            {getSuggestedStops().length > 0 && (
              <div className="mt-4">
                <h5 className="font-medium text-gray-800 mb-2">
                  <i className="fa-solid fa-pause mr-1"></i>{t('Paradas sugeridas:', 'Suggested stops:')}
                </h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  {getSuggestedStops().map((stop, index) => (
                    <li key={index}>• {stop}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {isCalculating && (
          <div className="mt-4 text-center text-gray-600">
            <div className="animate-spin inline-block w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mr-2"></div>
            {t('Calculando rota...', 'Calculating route...')}
          </div>
        )}
      </div>
    </div>
  );
}