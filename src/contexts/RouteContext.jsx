import { createContext, useContext, useState } from 'react';

const RouteContext = createContext();

export const useRoute = () => {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error('useRoute must be used within a RouteProvider');
  }
  return context;
};

export const RouteProvider = ({ children }) => {
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [transportMode, setTransportMode] = useState('driving'); // driving, cycling, walking
  const [routeOptimization, setRouteOptimization] = useState('shortest'); // shortest, fastest, scenic
  const [multiRouteData, setMultiRouteData] = useState(null);

  const addDestination = (destination) => {
    // Verificar se destination é válido
    if (!destination || !destination.id) {
      console.error('Destination inválida para adicionar à rota');
      return;
    }
    
    // Verificar se o destino já está na lista
    if (!selectedDestinations.find(d => d.id === destination.id)) {
      setSelectedDestinations(prev => [...prev, destination]);
    }
  };

  const removeDestination = (destinationId) => {
    // Verificar se destinationId é válido
    if (destinationId === undefined || destinationId === null) {
      console.error('ID de destino inválido para remover da rota');
      return;
    }
    
    setSelectedDestinations(prev => prev.filter(d => d.id !== destinationId));
  };

  const clearDestinations = () => {
    setSelectedDestinations([]);
    setMultiRouteData(null);
  };

  const reorderDestinations = (newOrder) => {
    // Verificar se newOrder é um array válido
    if (!Array.isArray(newOrder)) {
      console.error('Nova ordem de destinos inválida');
      return;
    }
    
    setSelectedDestinations(newOrder);
  };

  return (
    <RouteContext.Provider value={{
      selectedDestinations,
      transportMode,
      routeOptimization,
      multiRouteData,
      addDestination,
      removeDestination,
      clearDestinations,
      reorderDestinations,
      setTransportMode,
      setRouteOptimization,
      setMultiRouteData
    }}>
      {children}
    </RouteContext.Provider>
  );
};