import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

export default function HeroSection({ 
  heroImage, 
  destinations, 
  selectedDestination, 
  setSelectedDestination 
}) {
  const { t } = useLanguage();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!heroImage) {
      setImageLoaded(true);
      return;
    }
    
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => {
      console.error('Erro ao carregar imagem:', heroImage);
      setImageLoaded(true); // Mostra o fallback
    };
    img.src = heroImage;
  }, [heroImage]);

  return (
    <header className="hero-section relative text-white overflow-hidden flex flex-col justify-center" style={{ height: 'calc(100vh - 80px)' }}>
      {/* Background com Parallax */}
      <div
        className={`hero-background absolute inset-0 transition-opacity duration-1000 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          transform: 'scale(1.1)'
        }}
      ></div>
      
      {/* Loading placeholder */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin inline-block w-8 h-8 border-2 border-white border-t-transparent rounded-full mb-4"></div>
            <p className="text-white/70">{t('Carregando...', 'Loading...')}</p>
          </div>
        </div>
      )}
      
      {/* Overlay gradiente */}
      <div className="hero-overlay absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

      {/* Conteúdo Hero */}
      <div className="hero-content relative container mx-auto px-6 h-full flex items-center">
        <div className="max-w-4xl relative">
          {/* Frase de Impacto */}
          <div className="mb-8 animate-fadeInUp">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              {t('Descubra o Paraíso', 'Discover Paradise')}
            </h1>
            <h2 className="text-2xl md:text-3xl mb-8 text-blue-100 font-light">
              {t('Rota Serra e Charme Paxixi - Aquidauana, MS', 'Rota Serra e Charme Paxixi - Aquidauana, MS')}
            </h2>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl leading-relaxed text-gray-200">
              {t(
                'Uma jornada única pelas belezas naturais, trilhas deslumbrantes e rica cultura pantaneira. Deixe-nos guiá-lo pela experiência perfeita.',
                'A unique journey through natural beauty, stunning trails and rich Pantanal culture. Let us guide you through the perfect experience.'
              )}
            </p>
          </div>

          {/* Botão Principal */}
          <div className="animate-fadeInUp animation-delay-300">
            <a
              href="#experiencias"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-500 text-white px-12 py-6 rounded-full text-xl font-bold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <i className="fa-solid fa-compass mr-3 text-2xl"></i>
              {t('Explorar a Rota', 'Explore the Route')}
            </a>
          </div>

          {/* Atalhos Rápidos */}
          <div className="mt-16 animate-fadeInUp animation-delay-500">
            <div className="flex flex-wrap gap-4">
              <a
                href="#destinos"
                className="flex items-center bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-all duration-300"
              >
                <i className="fa-solid fa-mountain mr-2"></i>
                {t('Pontos Turísticos', 'Tourist Spots')}
              </a>
              <a
                href="#roteiro"
                className="flex items-center bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-all duration-300"
              >
                <i className="fa-solid fa-route mr-2"></i>
                {t('Roteiro Ideal', 'Ideal Itinerary')}
              </a>
              <Link
                to="/como-chegar"
                className="flex items-center bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-all duration-300"
              >
                <i className="fa-solid fa-directions mr-2"></i>
                {t('Como Chegar', 'How to Get There')}
              </Link>
              <Link
                to="/gallery"
                className="flex items-center bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-all duration-300"
              >
                <i className="fa-solid fa-images mr-2"></i>
                {t('Galeria', 'Gallery')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator animate-bounce" style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
        <div className="flex flex-col items-center text-white/70">
          <span className="text-sm mb-2">{t('Role para explorar', 'Scroll to explore')}</span>
          <i className="fa-solid fa-chevron-down text-2xl"></i>
        </div>
      </div>
    </header>
  );
} 