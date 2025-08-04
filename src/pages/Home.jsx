import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DESTINATIONS } from '../data/destinations';
import { useLanguage } from '../contexts/LanguageContext';
import InteractiveMap from '../components/InteractiveMap';
import AdvancedFilters from '../components/AdvancedFilters';
import DestinationCard from '../components/DestinationCard';
import RouteBuilder from '../components/RouteBuilder';
import LanguageToggle from '../components/LanguageToggle';
import heroImage from '../assets/images/paxixi_thumb.jpg';
import { getRandomHeroImage, MS_IMAGES } from '../data/images';
import ThemeToggle from '../components/ThemeToggle';
import AccessibilityPanel from '../components/AccessibilityPanel';
import AutoRouteGenerator from '../components/AutoRouteGenerator';
import ImageGallery from '../components/ImageGallery';
import Logo from '../components/Logo';

export default function Home() {
  const [filteredDestinations, setFilteredDestinations] = useState(DESTINATIONS);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [userPos, setUserPos] = useState(null);
  const [showMiniMap, setShowMiniMap] = useState(false);
  const { language, t } = useLanguage();

  // Scroll parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector('.parallax-bg');
      if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section Fullscreen com Parallax */}
      <header className="relative text-white overflow-hidden h-screen flex flex-col justify-center">
        {/* Background com Parallax */}
        <div
          className="parallax-bg absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        ></div>
        
        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        
        {/* Navegação fixa */}
        <nav className="fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-black/20 transition-all duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <Logo 
                size="medium" 
                textColor="text-white" 
                className="hover:opacity-90"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowMiniMap(!showMiniMap)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                title={t('Mini Mapa', 'Mini Map')}
              >
                <i className="fa-solid fa-map text-lg"></i>
              </button>
              <ThemeToggle className="text-white" />
              <LanguageToggle />
            </div>
          </div>
        </nav>

        {/* Conteúdo Hero */}
        <div className="relative z-20 container mx-auto px-6 h-full flex items-center">
          <div className="max-w-4xl">
            {/* Frase de Impacto */}
            <div className="mb-8 animate-fadeInUp">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                {t('Descubra o Paraíso', 'Discover Paradise')}
              </h1>
              <h2 className="text-2xl md:text-3xl mb-8 text-blue-100 font-light">
                {t('Serra & Paxixi - Aquidauana, MS', 'Serra & Paxixi - Aquidauana, MS')}
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

          {/* Mini-mapa flutuante */}
          {showMiniMap && (
            <div className="fixed top-20 right-6 w-80 h-60 bg-white rounded-xl shadow-2xl z-40 overflow-hidden animate-fadeInUp">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{t('Sua Localização', 'Your Location')}</span>
                  <button
                    onClick={() => setShowMiniMap(false)}
                    className="p-1 hover:bg-white/20 rounded"
                  >
                    <i className="fa-solid fa-times"></i>
                  </button>
                </div>
              </div>
              <div className="h-48">
                <InteractiveMap
                  destinations={DESTINATIONS.slice(0, 3)}
                  className="h-full"
                  routeData={null}
                />
              </div>
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="flex flex-col items-center text-white/70">
            <span className="text-sm mb-2">{t('Role para explorar', 'Scroll to explore')}</span>
            <i className="fa-solid fa-chevron-down text-2xl"></i>
          </div>
        </div>
      </header>

      {/* Seção Experiências Imperdíveis */}
      <section id="experiencias" className="py-24 bg-white scroll-reveal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">
              {t('Experiências Imperdíveis', 'Unmissable Experiences')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t(
                'Descubra os tesouros escondidos da Serra & Paxixi através de experiências únicas e inesquecíveis',
                'Discover the hidden treasures of Serra & Paxixi through unique and unforgettable experiences'
              )}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Card 1 - Trilhas */}
            <div className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-green-600 text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="fa-solid fa-mountain-sun"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {t('Trilhas Deslumbrantes', 'Stunning Trails')}
              </h3>
              <p className="text-gray-600 mb-6">
                {t(
                  'Caminhe por trilhas ecológicas com vistas panorâmicas da Serra de Maracaju e observe a fauna nativa em seu habitat natural.',
                  'Walk through ecological trails with panoramic views of Serra de Maracaju and observe native fauna in their natural habitat.'
                )}
              </p>
              <div className="flex items-center text-green-600 font-semibold">
                <span>{t('Explorar trilhas', 'Explore trails')}</span>
                <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
              </div>
            </div>

            {/* Card 2 - Cultura */}
            <div className="group bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-purple-600 text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="fa-solid fa-landmark-dome"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {t('Cultura Pantaneira', 'Pantanal Culture')}
              </h3>
              <p className="text-gray-600 mb-6">
                {t(
                  'Mergulhe na rica história e tradições locais, visitando museus, centros culturais e participando de festivais tradicionais.',
                  'Immerse yourself in rich local history and traditions, visiting museums, cultural centers and participating in traditional festivals.'
                )}
              </p>
              <div className="flex items-center text-purple-600 font-semibold">
                <span>{t('Descobrir cultura', 'Discover culture')}</span>
                <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
              </div>
            </div>

            {/* Card 3 - Gastronomia */}
            <div className="group bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-orange-600 text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="fa-solid fa-utensils"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {t('Sabores Únicos', 'Unique Flavors')}
              </h3>
              <p className="text-gray-600 mb-6">
                {t(
                  'Deguste a autêntica culinária pantaneira com pratos típicos como pacu assado, farofa de banana e doces tradicionais.',
                  'Taste authentic Pantanal cuisine with typical dishes like roasted pacu, banana farofa and traditional sweets.'
                )}
              </p>
              <div className="flex items-center text-orange-600 font-semibold">
                <span>{t('Saborear pratos', 'Taste dishes')}</span>
                <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
              </div>
            </div>
          </div>

          {/* Depoimentos */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-3xl p-12 text-white">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">
                {t('O que nossos visitantes dizem', 'What our visitors say')}
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <i className="fa-solid fa-user text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">Maria Santos</h4>
                    <p className="text-blue-100 text-sm">{t('São Paulo, SP', 'São Paulo, SP')}</p>
                  </div>
                </div>
                <p className="text-blue-50">
                  {t(
                    '"Uma experiência incrível! As trilhas são bem sinalizadas e as vistas são de tirar o fôlego. Recomendo para toda a família."',
                    '"An incredible experience! The trails are well marked and the views are breathtaking. I recommend it for the whole family."'
                  )}
                </p>
                <div className="flex text-yellow-300 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star"></i>
                  ))}
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <i className="fa-solid fa-user text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">João Silva</h4>
                    <p className="text-blue-100 text-sm">{t('Campo Grande, MS', 'Campo Grande, MS')}</p>
                  </div>
                </div>
                <p className="text-blue-50">
                  {t(
                    '"A culinária local é fantástica! Cada prato conta uma história da região. O atendimento foi excepcional em todos os lugares."',
                    '"The local cuisine is fantastic! Each dish tells a story of the region. The service was exceptional everywhere."'
                  )}
                </p>
                <div className="flex text-yellow-300 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star"></i>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Roteiro Automático */}
      <section id="roteiro" className="py-24 bg-gradient-to-br from-gray-900 to-blue-900 text-white scroll-reveal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              {t('Roteiro Inteligente', 'Smart Itinerary')}
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {t(
                'Deixe nossa IA criar o roteiro perfeito para você, otimizando tempo, custos e experiências',
                'Let our AI create the perfect itinerary for you, optimizing time, costs and experiences'
              )}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-map-marked-alt text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      {t('Seleção Automática', 'Automatic Selection')}
                    </h3>
                    <p className="text-blue-100">
                      {t(
                        'Nosso algoritmo seleciona os melhores pontos turísticos baseado em sua localização, preferências e tempo disponível.',
                        'Our algorithm selects the best tourist spots based on your location, preferences and available time.'
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-route text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      {t('Rota Otimizada', 'Optimized Route')}
                    </h3>
                    <p className="text-blue-100">
                      {t(
                        'Calculamos a ordem ideal de visitação para minimizar deslocamentos e maximizar sua experiência.',
                        'We calculate the ideal visiting order to minimize travel and maximize your experience.'
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-calculator text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      {t('Cálculo Completo', 'Complete Calculation')}
                    </h3>
                    <p className="text-blue-100">
                      {t(
                        'Estimamos tempo, distância, custos de combustível, alimentação e entradas para um planejamento perfeito.',
                        'We estimate time, distance, fuel costs, meals and admissions for perfect planning.'
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <a
                  href="#gerador-roteiro"
                  className="inline-block bg-gradient-to-r from-teal-500 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <i className="fa-solid fa-magic-wand-sparkles mr-3"></i>
                  {t('Gerar Roteiro Automático', 'Generate Automatic Itinerary')}
                </a>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h4 className="text-2xl font-bold mb-6 text-center">
                {t('Exemplo de Roteiro', 'Sample Itinerary')}
              </h4>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div className="flex-1">
                    <h5 className="font-semibold">Mirante do Paxixi</h5>
                    <p className="text-sm text-blue-100">08:00 - 10:30 • 2.5h • R$ 15</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                  <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div className="flex-1">
                    <h5 className="font-semibold">Restaurante Pantaneiro</h5>
                    <p className="text-sm text-blue-100">11:00 - 12:30 • 1.5h • R$ 45</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div className="flex-1">
                    <h5 className="font-semibold">Cachoeira da Serra</h5>
                    <p className="text-sm text-blue-100">13:00 - 16:00 • 3h • R$ 20</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>{t('Total:', 'Total:')}</span>
                  <span className="font-bold">7h • 45km • R$ 80</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gerador de Roteiro Automático */}
      <section id="gerador-roteiro" className="py-24 bg-gray-50 scroll-reveal">
        <div className="max-w-7xl mx-auto px-6">
          <AutoRouteGenerator />
        </div>
      </section>

      {/* Interactive Map Section */}
      <section id="mapa" className="bg-white py-16 scroll-reveal">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {t('Mapa Interativo', 'Interactive Map')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t(
                'Explore os pontos turísticos no mapa, veja sua localização atual e planeje sua rota',
                'Explore tourist spots on the map, see your current location and plan your route'
              )}
            </p>
          </div>
          
          <InteractiveMap 
            destinations={DESTINATIONS}
            onMarkerClick={setSelectedDestination}
            className="h-96 mb-8"
            routeData={null}
          />
          
          {/* Route Builder */}
          <RouteBuilder userPos={userPos} />
        </div>
      </section>

      {/* Galeria de Imagens do MS */}
      <section className="py-24 bg-gradient-to-br from-green-50 to-blue-50 scroll-reveal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">
              {t('Belezas do Mato Grosso do Sul', 'Beauties of Mato Grosso do Sul')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t(
                'Descubra a diversidade natural e cultural que torna nossa região única',
                'Discover the natural and cultural diversity that makes our region unique'
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Pantanal */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
              <img 
                src={MS_IMAGES.gallery.pantanal[0]} 
                alt="Pantanal" 
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">{t('Pantanal', 'Pantanal')}</h3>
                <p className="text-sm opacity-90">{t('Maior planície alagada do mundo', 'World\'s largest wetland')}</p>
              </div>
            </div>

            {/* Serra */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
              <img 
                src={MS_IMAGES.gallery.serra[0]} 
                alt="Serra" 
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">{t('Serra de Maracaju', 'Maracaju Mountain Range')}</h3>
                <p className="text-sm opacity-90">{t('Vistas panorâmicas deslumbrantes', 'Stunning panoramic views')}</p>
              </div>
            </div>

            {/* Fauna */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
              <img 
                src={MS_IMAGES.gallery.fauna[0]} 
                alt="Fauna" 
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">{t('Fauna Nativa', 'Native Fauna')}</h3>
                <p className="text-sm opacity-90">{t('Biodiversidade única', 'Unique biodiversity')}</p>
              </div>
            </div>

            {/* Flora */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
              <img 
                src={MS_IMAGES.gallery.flora[0]} 
                alt="Flora" 
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">{t('Flora Local', 'Local Flora')}</h3>
                <p className="text-sm opacity-90">{t('Vegetação exuberante', 'Lush vegetation')}</p>
              </div>
            </div>
          </div>

          {/* Galeria Completa */}
          <ImageGallery 
            images={Object.values(MS_IMAGES.gallery).flat().slice(0, 12)}
            title={t('Galeria Completa', 'Complete Gallery')}
            subtitle={t('Clique nas imagens para ampliar', 'Click on images to enlarge')}
            category="MS"
          />
          
          {/* Botão Ver Mais */}
          <div className="text-center mt-8">
            <Link
              to="/gallery"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <i className="fa-solid fa-images mr-3"></i>
              {t('Ver Galeria Completa', 'View Complete Gallery')}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-900 py-16 text-gray-100 scroll-reveal">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">{DESTINATIONS.length}</div>
              <div className="text-gray-400">{t('Destinos', 'Destinations')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">15+</div>
              <div className="text-gray-400">{t('Trilhas', 'Trails')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">5</div>
              <div className="text-gray-400">{t('Cachoeiras', 'Waterfalls')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-400">{t('Natural', 'Natural')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <main id="destinos" className="flex-1 py-16 bg-white scroll-reveal">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {t('Pontos de Interesse', 'Points of Interest')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t(
                'Descubra os tesouros naturais e culturais da região com roteiros personalizados',
                'Discover the natural and cultural treasures of the region with personalized itineraries'
              )}
            </p>
          </div>
          
          {/* Advanced Filters */}
          <AdvancedFilters 
            destinations={DESTINATIONS}
            onFilterChange={setFilteredDestinations}
          />
          
          {/* Destination Cards */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredDestinations.map((dest) => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                onSelect={setSelectedDestination}
                isSelected={selectedDestination?.id === dest.id}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <Logo 
                size="large" 
                textColor="text-white" 
                className="mb-4"
              />
              <p className="text-gray-400">
                {t(
                  'Descubra as belezas naturais e culturais de Aquidauana no coração do Pantanal.',
                  'Discover the natural and cultural beauties of Aquidauana in the heart of the Pantanal.'
                )}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('Contato', 'Contact')}</h4>
              <p className="text-gray-400 mb-2">📧 info@rotaserra.com.br</p>
              <p className="text-gray-400 mb-2">📱 (67) 3241-0000</p>
              <p className="text-gray-400">📍 Aquidauana, MS</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('Siga-nos', 'Follow us')}</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">YouTube</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 {t('Rota Serra & Paxixi. Todos os direitos reservados.', 'Serra & Paxixi Route. All rights reserved.')}</p>
          </div>
        </div>
      </footer>

      {/* Accessibility Panel */}
      <AccessibilityPanel />
    </div>
  );
} 