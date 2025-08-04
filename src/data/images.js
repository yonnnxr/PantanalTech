// Imagens específicas do Mato Grosso do Sul e Pantanal
export const MS_IMAGES = {
  // Imagens Hero/Banner
  hero: {
    pantanal: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&h=1080&fit=crop',
    serra: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
    cachoeira: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop',
    fauna: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=1920&h=1080&fit=crop'
  },

  // Imagens por categoria de destino
  destinations: {
    // Trilhas e Ecoturismo
    trilhas: [
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg'
    ],
    
    // Cachoeiras
    cachoeiras: [
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg'
    ],
    
    // Cultura e História
    cultura: [
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg'
    ],
    
    // Gastronomia
    gastronomia: [
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg'
    ],
    
    // Hospedagem
    hospedagem: [
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg'
    ]
  },

  // Galeria geral do MS
  gallery: {
    pantanal: [
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg'
    ],
    serra: [
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg'
    ],
    fauna: [
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg'
    ],
    flora: [
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg'
    ]
  },

  // Imagens específicas por destino - Usando mais a imagem local
  byDestination: {
    'mirante-paxixi': [
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg'
    ],
    'serra-maracaju': [
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg'
    ],
    'museu-aquidauana': [
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg'
    ],
    'cachoeira-aquidaban': [
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg'
    ],
    'fazenda-sao-miguel': [
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg'
    ],
    'centro-historico': [
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg'
    ],
    'restaurante-pantaneiro': [
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg'
    ],
    'pousada-recanto': [
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg',
      '/src/assets/images/paxixi_thumb.jpg'
    ]
  }
};

// Função para obter imagens por categoria
export const getImagesByCategory = (category) => {
  return MS_IMAGES.destinations[category] || MS_IMAGES.destinations.trilhas;
};

// Função para obter imagens por destino
export const getImagesByDestination = (destinationId) => {
  return MS_IMAGES.byDestination[destinationId] || MS_IMAGES.destinations.trilhas;
};

// Função para obter imagem hero aleatória
export const getRandomHeroImage = () => {
  const heroImages = Object.values(MS_IMAGES.hero);
  return heroImages[Math.floor(Math.random() * heroImages.length)];
}; 