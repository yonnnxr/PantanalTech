import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DESTINATIONS } from '../data/destinations';
import { useLanguage } from '../contexts/LanguageContext';
import InteractiveMap from '../components/InteractiveMap';
import AdvancedFilters from '../components/AdvancedFilters';
import DestinationCard from '../components/DestinationCard';
import DestinationModal from '../components/DestinationModal';
import RouteBuilder from '../components/RouteBuilder';
import heroImage from '../assets/images/paxixi_thumb1.jpg';
import { getRandomHeroImage, GALLERY_IMAGES } from '../data/images';
import AccessibilityPanel from '../components/AccessibilityPanel';
import AutoRouteGenerator from '../components/AutoRouteGenerator';
import ImageGallery from '../components/ImageGallery';
import HeroSection from '../components/HeroSection';
import AppFooter from '../components/AppFooter';
import Navbar from '../components/Navbar';

export default function Home() {
  const [filteredDestinations, setFilteredDestinations] = useState(DESTINATIONS);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [userPos, setUserPos] = useState(null);
  const { language, t } = useLanguage();

  // Parallax convertido para CSS - nenhuma lógica JS necessária
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector('.parallax-bg');
      if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    /* retorno removido */
  }, []);

  // Scroll reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.classList.contains('animate-fadeInUp')) {
            entry.target.classList.add('animate-fadeInUp');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

    return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection 
        heroImage={heroImage}
        destinations={DESTINATIONS}
        selectedDestination={selectedDestination}
        setSelectedDestination={setSelectedDestination}
      />

      {/* Seção Experiências Imperdíveis */}
      <section id="experiencias" className="py-24 bg-white scroll-reveal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">
              {t('Experiências Imperdíveis', 'Unmissable Experiences')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t(
                              'Descubra os tesouros escondidos da Rota Serra e Charme Paxixi através de experiências únicas e inesquecíveis',
              'Discover the hidden treasures of Rota Serra e Charme Paxixi through unique and unforgettable experiences'
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
                <i className="fa-solid fa-building"></i>
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
            onMarkerClick={(dest) => {
              if (selectedDestination?.id !== dest.id) {
                setSelectedDestination(dest);
              }
            }}
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
                src={GALLERY_IMAGES.pantanal[0]} 
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
                src={GALLERY_IMAGES.serra[0]} 
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
                src={GALLERY_IMAGES.fauna[0]} 
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
                src={GALLERY_IMAGES.flora[0]} 
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
            images={Object.values(GALLERY_IMAGES).flat().slice(0, 12)}
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
                onSelect={(dest) => {
                  if (selectedDestination?.id !== dest.id) {
                    setSelectedDestination(dest);
                  }
                }}
                isSelected={selectedDestination?.id === dest.id}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <AppFooter />

      {/* Destination Modal */}
      {selectedDestination && (
        <DestinationModal
          destination={selectedDestination}
          isOpen={!!selectedDestination}
          onClose={() => setSelectedDestination(null)}
        />
      )}

      {/* Accessibility Panel */}
      <AccessibilityPanel />
    </div>
  );
} 