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
        const scrollPosition = parseInt(scrollY.replace('-', ''), 10);
        if (!isNaN(scrollPosition)) {
          window.scrollTo(0, scrollPosition);
        }
      }
    }

    // Cleanup: restaura o scroll se o componente for desmontado
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.top = '';
      // Restaurar scroll ao desmontar
      const scrollY = document.body.style.top;
      if (scrollY) {
        const scrollPosition = parseInt(scrollY.replace('-', ''), 10);
        if (!isNaN(scrollPosition)) {
          window.scrollTo(0, scrollPosition);
        }
      }
    };
  }, [activeModals]);

  const openModal = (modalId) => {
    // Verificar se modalId é válido
    if (!modalId) {
      console.error('modalId inválido para abrir modal');
      return;
    }
    
    setActiveModals(prev => {
      if (!prev.includes(modalId)) {
        return [...prev, modalId];
      }
      return prev;
    });
  };

  const closeModal = (modalId) => {
    // Verificar se modalId é válido
    if (!modalId) {
      console.error('modalId inválido para fechar modal');
      return;
    }
    
    setActiveModals(prev => prev.filter(id => id !== modalId));
  };

  const isModalOpen = (modalId) => {
    // Verificar se modalId é válido
    if (!modalId) {
      return false;
    }
    
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