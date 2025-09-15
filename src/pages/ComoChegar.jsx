import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DESTINATIONS } from '../data/destinations';
import { useLanguage } from '../contexts/LanguageContext';
import InteractiveMap from '../components/InteractiveMap';
import heroImage from '../assets/images/paxixi_thumb1.jpg';
import Navbar from '../components/Navbar';

export default function ComoChegar() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [userPos, setUserPos] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { language, t } = useLanguage();

  useEffect(() => {
    // Verificar se DESTINATIONS é um array válido
    const validDestinations = Array.isArray(DESTINATIONS) ? DESTINATIONS : [];
    
    // Buscar destino pelo ID ou usar o primeiro se não especificado
    const destId = id ? parseInt(id, 10) : 1;
    const foundDest = validDestinations.find(d => d.id === destId) || validDestinations[0];
    setDestination(foundDest);
    
    // Simular dados de rota (mock)
    setTimeout(() => {
      setRouteData({
        distance: '23.5 km',
        duration: '35 min',
        fuelCost: 'R$ 12,50',
        route: [
          { step: 1, instruction: t('Siga pela BR-262 por 15 km', 'Follow BR-262 for 15 km'), duration: '18 min' },
          { step: 2, instruction: t('Vire à direita na MS-345', 'Turn right on MS-345'), duration: '12 min' },
          { step: 3, instruction: t('Continue por 8,5 km até o destino', 'Continue for 8.5 km to destination'), duration: '5 min' }
        ],
        tips: [
          t('Posto de combustível disponível no km 12', 'Gas station available at km 12'),
          t('Trecho sem sinal de celular entre km 18-22', 'No cell signal between km 18-22'),
          t('Melhor horário: manhã (7h-10h) ou tarde (15h-18h)', 'Best time: morning (7am-10am) or afternoon (3pm-6pm)')
        ]
      });
      setLoading(false);
    }, 1000);

    // Geolocalização
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPos([position.coords.latitude, position.coords.longitude]);
        },
        () => {
          setUserPos([-20.463, -55.789]); // Fallback para Aquidauana
        }
      );
    } else {
      setUserPos([-20.463, -55.789]); // Fallback para Aquidauana
    }
  }, [id, language, t]);

  // Verificar se destination existe
  if (!destination) return null;

  const openInGoogleMaps = () => {
    // Verificar se userPos é válido
    const userPosStr = userPos && Array.isArray(userPos) && userPos.length === 2 ? 
                      `${userPos[0]},${userPos[1]}` : 'Aquidauana,MS';
    const url = `https://www.google.com/maps/dir/${userPosStr}/${destination.lat},${destination.lon}`;
    window.open(url, '_blank');
  };

  const downloadPDF = () => {
    // Simular download de PDF
    alert(t('Download do roteiro iniciado!', 'Route download started!'));
  };

  const shareRoute = () => {
    if (navigator && navigator.share) {
      navigator.share({
        title: `Como chegar: ${destination.name}`,
        text: `Rota para ${destination.name} - Rota Serra e Charme Paxixi`,
        url: window.location.href
      });
    } else {
      if (navigator && navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        alert(t('Link copiado!', 'Link copied!'));
      } else {
        // Fallback para navegadores que não suportam clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert(t('Link copiado!', 'Link copied!'));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        variant="default"
        showBackButton={true}
        onBackClick={() => window.history.back()}
        title={t('Como Chegar', 'How to Get There')}
      />

      <div className="max-w-7xl mx-auto px-6 py-8 pt-20">
        {/* Cabeçalho do destino */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="relative h-64">
            <img
              src={heroImage}
              alt={language === 'pt' ? (destination.name || '') : (destination.nameEn || '')}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Imagem de fallback caso a imagem não carregue
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbSBuw6NvIGRpcG9uw608L3RleHQ+PC9zdmc+';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h2 className="text-3xl font-bold mb-2">
                {language === 'pt' ? (destination.name || '') : (destination.nameEn || '')}
              </h2>
              <p className="text-lg opacity-90">
                {language === 'pt' ? (destination.description || '') : (destination.descriptionEn || '')}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Mapa com rota */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  <i className="fa-solid fa-route mr-3 text-blue-600"></i>
                  {t('Rota Detalhada', 'Detailed Route')}
                </h3>
                <p className="text-gray-600">
                  {t('Mapa interativo com a melhor rota até o destino', 'Interactive map with the best route to destination')}
                </p>
              </div>
              
              <div className="h-96">
                <InteractiveMap
                  destinations={[destination]}
                  className="h-full"
                  routeData={routeData}
                  userPos={userPos}
                />
              </div>

              {/* Instruções passo a passo */}
              {!loading && routeData && Array.isArray(routeData.route) && routeData.route.length > 0 && (
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">
                    <i className="fa-solid fa-list-ol mr-2 text-blue-600"></i>
                    {t('Instruções', 'Directions')}
                  </h4>
                  <div className="space-y-4">
                    {routeData.route.map((step) => (
                      <div key={step.step} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800 font-medium">{step.instruction}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            <i className="fa-solid fa-clock mr-1"></i>
                            {step.duration}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar com informações */}
          <div className="space-y-6">
            {/* Resumo da viagem */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                <i className="fa-solid fa-info-circle mr-2 text-blue-600"></i>
                {t('Resumo da Viagem', 'Trip Summary')}
              </h3>
              
              {loading ? (
                <div className="space-y-4">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ) : routeData ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <i className="fa-solid fa-road text-blue-600 mr-2"></i>
                      <span className="text-gray-700">{t('Distância', 'Distance')}</span>
                    </div>
                    <span className="font-bold text-blue-600">{routeData.distance || '0 km'}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <i className="fa-solid fa-clock text-green-600 mr-2"></i>
                      <span className="text-gray-700">{t('Tempo', 'Time')}</span>
                    </div>
                    <span className="font-bold text-green-600">{routeData.duration || '0 min'}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center">
                      <i className="fa-solid fa-gas-pump text-orange-600 mr-2"></i>
                      <span className="text-gray-700">{t('Combustível', 'Fuel')}</span>
                    </div>
                    <span className="font-bold text-orange-600">{routeData.fuelCost || 'R$ 0,00'}</span>
                  </div>
                </div>
              ) : (
                <div className="text-gray-500 text-center py-4">
                  {t('Dados da rota não disponíveis', 'Route data not available')}
                </div>
              )}
            </div>

            {/* Botões de ação */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                <i className="fa-solid fa-external-link-alt mr-2 text-blue-600"></i>
                {t('Ações Rápidas', 'Quick Actions')}
              </h3>
              
              <div className="space-y-3">
                <button
                  onClick={openInGoogleMaps}
                  className="w-full flex items-center justify-center bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  <i className="fa-solid fa-external-link-alt mr-2"></i>
                  {t('Abrir no Google Maps', 'Open in Google Maps')}
                </button>
                
                <button
                  onClick={downloadPDF}
                  className="w-full flex items-center justify-center bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  <i className="fa-solid fa-download mr-2"></i>
                  {t('Baixar Roteiro PDF', 'Download Route PDF')}
                </button>
                
                <button
                  onClick={shareRoute}
                  className="w-full flex items-center justify-center bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  <i className="fa-solid fa-share mr-2"></i>
                  {t('Compartilhar Rota', 'Share Route')}
                </button>
              </div>
            </div>

            {/* Dicas do trajeto */}
            {!loading && routeData && Array.isArray(routeData.tips) && routeData.tips.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  <i className="fa-solid fa-lightbulb mr-2 text-yellow-600"></i>
                  {t('Dicas do Trajeto', 'Route Tips')}
                </h3>
                
                <div className="space-y-3">
                  {routeData.tips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <i className="fa-solid fa-info-circle text-yellow-600 mt-0.5"></i>
                      <p className="text-sm text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Informações do destino */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                <i className="fa-solid fa-map-marker-alt mr-2 text-red-600"></i>
                {t('Sobre o Destino', 'About Destination')}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">{t('Horários', 'Schedule')}</h4>
                  <div className="text-sm text-gray-600">
                    <p>{t('Segunda a Sexta:', 'Monday to Friday:')} {destination.schedule?.weekdays || t('Não especificado', 'Not specified')}</p>
                    <p>{t('Fins de Semana:', 'Weekends:')} {destination.schedule?.weekends || t('Não especificado', 'Not specified')}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">{t('Contato', 'Contact')}</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    {destination.contacts?.phone && (
                      <p><i className="fa-solid fa-phone mr-2"></i>{destination.contacts.phone}</p>
                    )}
                    {destination.contacts?.whatsapp && (
                      <p><i className="fab fa-whatsapp mr-2"></i>{destination.contacts.whatsapp}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">{t('Dificuldade', 'Difficulty')}</h4>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    (language === 'pt' ? (destination.difficulty || '') : (destination.difficultyEn || '')) === 'Fácil' || 
                    (language === 'pt' ? (destination.difficulty || '') : (destination.difficultyEn || '')) === 'Easy'
                      ? 'bg-green-100 text-green-800'
                      : (language === 'pt' ? (destination.difficulty || '') : (destination.difficultyEn || '')) === 'Moderada' ||
                        (language === 'pt' ? (destination.difficulty || '') : (destination.difficultyEn || '')) === 'Moderate'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {language === 'pt' ? (destination.difficulty || t('Não especificada', 'Not specified')) : (destination.difficultyEn || t('Not specified', 'Not specified'))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}