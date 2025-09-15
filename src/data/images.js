// Importações de imagens para o Vite
import paxixi1 from '../assets/images/Paxixi/PorDoSol.jpg';
import paxixi2 from '../assets/images/Paxixi/Morro-do-Paxixi-1200x630.jpg.webp';
import paxixi3 from '../assets/images/Paxixi/mirante-morro-paxixi-aquidauana.jpg';

import serra1 from '../assets/images/SerraMaracaju/serra_maracaju_3.jpg';
import serra2 from '../assets/images/SerraMaracaju/Serra-de-Maracaju-com-lago.jpeg';
import serra3 from '../assets/images/SerraMaracaju/Serra_de_Maracaju.jpg';

import museu1 from '../assets/images/MuseuAquidauana/MuseuArtePantaneira.webp';
import museu2 from '../assets/images/MuseuAquidauana/MuseuArtePantaneira2.jpg';
import museu3 from '../assets/images/MuseuAquidauana/MuseuMarechalJosé.jpg';

import cachoeira1 from '../assets/images/CachoeiraAquidauana/CachoeiraAquidauana.jpg';
import cachoeira2 from '../assets/images/CachoeiraAquidauana/CachoeiraAquidauana2.jpg';
import cachoeira3 from '../assets/images/CachoeiraAquidauana/CachoeiraAquidauana3.jpg';

import fazenda1 from '../assets/images/FazendaSaoMiguel/FazendaSaoMiguel.jpg';
import fazenda2 from '../assets/images/FazendaSaoMiguel/FazendaSaoMiguel2.jpg';
import fazenda3 from '../assets/images/FazendaSaoMiguel/FazendaSaoMiguel3.jpeg';

import centro1 from '../assets/images/CentroHistorico/CentroHistorico.jpg';
import centro2 from '../assets/images/CentroHistorico/CentroHistorico2.jpg';
import centro3 from '../assets/images/CentroHistorico/CentroHistorico3.jpg';

import restaurante1 from '../assets/images/RestaurantePantaneiro/EstacaoPantaneira.jpg';
import restaurante2 from '../assets/images/RestaurantePantaneiro/RanchoDoPescador.jpg';
import restaurante3 from '../assets/images/RestaurantePantaneiro/RestauranteCasarao.png';

// Hero images
import heroImage from '../assets/images/paxixi_thumb1.jpg';

// Gallery images
import galleryPantanal1 from '../assets/images/gallery/pantanal/20210807_081244-1.jpg';
import galleryPantanal2 from '../assets/images/gallery/pantanal/pan-scaled.jpg';
import galleryPantanal3 from '../assets/images/gallery/pantanal/pantanal-region-mato-grosso-brazil-south-america-forest-in-early-morning-seen-along-the-cuiaba-river-P1XKGX.jpg';
import galleryPantanal4 from '../assets/images/gallery/pantanal/Pantanal.jpg';

import galleryFauna1 from '../assets/images/gallery/fauna/Anta-Pantanal-FazendaSanFrancisco-550.jpg';
import galleryFauna2 from '../assets/images/gallery/fauna/big_9_pantanal.jpg';
import galleryFauna3 from '../assets/images/gallery/fauna/tamandua-bandeira550.jpg';
import galleryFauna4 from '../assets/images/gallery/fauna/tuiuiu.jpg';

import galleryFlora1 from '../assets/images/gallery/flora/1-Pantanal-1.webp';
import galleryFlora2 from '../assets/images/gallery/flora/aquidauna-ms-pantanal-sul-trevo-de-quatro-folhas-quatro-folhas-planta-aqutica-flora-pantanal-pantanal-sul-aquidauana-mato-grosso-do-sul-centro-oeste-br.jpg';
import galleryFlora3 from '../assets/images/gallery/flora/flora-del-Pantanal.webp';
import galleryFlora4 from '../assets/images/gallery/flora/Flora-e-Vegetacao-do-Pantanal-Matogrossense.jpg';

import gallerySerra1 from '../assets/images/gallery/serra/Estrada-Parque-de-Piraputanga-1024x843.webp';
import gallerySerra2 from '../assets/images/gallery/serra/Serra_de_Maracaju_-_Vale_do_Aquidauana_MS_-_panoramio_(1).jpg';
import gallerySerra3 from '../assets/images/gallery/serra/Serra_de_Maracaju.jpg';
import gallerySerra4 from '../assets/images/gallery/serra/Serra-de-Maracaju-Aquidauana-MS-1024x576.webp';

// Verificar se as imagens foram importadas corretamente
const validateImage = (image, fallback) => {
  return image && typeof image === 'string' ? image : fallback;
};

// Exportar imagens organizadas por destino
export const DESTINATION_IMAGES = {
  paxixi: [paxixi1, paxixi2, paxixi3].filter(img => img),
  serra: [serra1, serra2, serra3].filter(img => img),
  museu: [museu1, museu2, museu3].filter(img => img),
  cachoeira: [cachoeira1, cachoeira2, cachoeira3].filter(img => img),
  fazenda: [fazenda1, fazenda2, fazenda3].filter(img => img),
  centro: [centro1, centro2, centro3].filter(img => img),
  restaurante: [restaurante1, restaurante2, restaurante3].filter(img => img)
};

// Exportar imagens da galeria
export const GALLERY_IMAGES = {
  pantanal: [galleryPantanal1, galleryPantanal2, galleryPantanal3, galleryPantanal4].filter(img => img),
  fauna: [galleryFauna1, galleryFauna2, galleryFauna3, galleryFauna4].filter(img => img),
  flora: [galleryFlora1, galleryFlora2, galleryFlora3, galleryFlora4].filter(img => img),
  serra: [gallerySerra1, gallerySerra2, gallerySerra3, gallerySerra4].filter(img => img)
};

// Exportar imagem hero
export { heroImage };

// Função para obter imagens aleatórias do hero
export const getRandomHeroImage = () => {
  const heroImages = [
    heroImage,
    galleryPantanal1,
    gallerySerra1
  ].filter(img => img);
  
  if (heroImages.length === 0) {
    return null;
  }
  
  return heroImages[Math.floor(Math.random() * heroImages.length)];
};

// Função para obter imagens de um destino específico
export const getDestinationImages = (destinationId) => {
  // Verificar se destinationId é um número válido
  if (typeof destinationId !== 'number' || destinationId < 1 || destinationId > 8) {
    return [];
  }
  
  const imageMap = {
    1: DESTINATION_IMAGES.paxixi,
    2: DESTINATION_IMAGES.serra,
    3: DESTINATION_IMAGES.museu,
    4: DESTINATION_IMAGES.cachoeira,
    5: DESTINATION_IMAGES.fazenda,
    6: DESTINATION_IMAGES.centro,
    7: DESTINATION_IMAGES.restaurante,
    8: DESTINATION_IMAGES.fazenda // Pousada usa as mesmas imagens da fazenda
  };
  
  // Verificar se o array de imagens existe e não está vazio
  const images = imageMap[destinationId];
  return Array.isArray(images) ? images : [];
}; 