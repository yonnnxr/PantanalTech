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
    if (!selectedDestinations.find(d => d.id === destination.id)) {
      setSelectedDestinations([...selectedDestinations, destination]);
    }
  };

  const removeDestination = (destinationId) => {
    setSelectedDestinations(selectedDestinations.filter(d => d.id !== destinationId));
  };

  const clearDestinations = () => {
    setSelectedDestinations([]);
    setMultiRouteData(null);
  };

  const reorderDestinations = (newOrder) => {
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