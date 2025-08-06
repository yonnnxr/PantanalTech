import { createContext, useContext, useState, useEffect } from 'react';

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }) => {
  const [activeModals, setActiveModals] = useState([]);

  // Trava o scroll quando há modais ativos
  useEffect(() => {
    const hasModals = activeModals.length > 0;
    
    if (hasModals) {
      // Salva o scroll atual e adiciona classe
      const scrollY = window.scrollY;
      document.body.style.top = `-${scrollY}px`;
      document.body.classList.add('modal-open');
    } else {
      // Restaura o scroll e remove classe
      const scrollY = document.body.style.top;
      document.body.classList.remove('modal-open');
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      // Cleanup: restaura o scroll se o componente for desmontado
      document.body.classList.remove('modal-open');
      document.body.style.top = '';
    };
  }, [activeModals]);

  const openModal = (modalId) => {
    setActiveModals(prev => {
      if (!prev.includes(modalId)) {
        return [...prev, modalId];
      }
      return prev;
    });
  };

  const closeModal = (modalId) => {
    setActiveModals(prev => prev.filter(id => id !== modalId));
  };

  const isModalOpen = (modalId) => {
    return activeModals.includes(modalId);
  };

  const hasActiveModals = activeModals.length > 0;

  return (
    <ModalContext.Provider value={{
      openModal,
      closeModal,
      isModalOpen,
      hasActiveModals,
      activeModals
    }}>
      {children}
    </ModalContext.Provider>
  );
}; 