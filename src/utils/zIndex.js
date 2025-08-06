// Sistema de Z-Index organizado para todo o projeto
export const Z_INDEX = {
  // Elementos base (0-100)
  BASE: 0,
  CONTENT: 10,
  CARD: 20,
  DROPDOWN: 30,
  TOOLTIP: 40,
  
  // Elementos de interface (100-500)
  NAVBAR: 100,
  SIDEBAR: 200,
  MODAL_BACKDROP: 300,
  MODAL: 400,
  MODAL_CONFIRMATION: 450,
  
  // Elementos de overlay (500-1000)
  OVERLAY: 500,
  NOTIFICATION: 600,
  ACCESSIBILITY: 700,
  SHARE_MENU: 800,
  
  // Elementos críticos (1000+)
  CRITICAL: 1000,
  EMERGENCY: 2000,
  MAXIMUM: 9999
};

// Função helper para obter z-index
export const getZIndex = (level) => {
  return Z_INDEX[level] || Z_INDEX.BASE;
}; 