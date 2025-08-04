import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useRoute } from '../contexts/RouteContext';
import { FavoriteButton } from './FavoritesManager';
import ShareButton from './ShareButton';

export default function DestinationModal({ destination, isOpen, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('info');
  const { language, t } = useLanguage();
  const { addDestination, removeDestination, selectedDestinations } = useRoute();

  if (!isOpen || !destination) return null;

  const isInRoute = selectedDestinations.some(d => d.id === destination.id);

  const toggleInRoute = () => {
    if (isInRoute) {
      removeDestination(destination.id);
    } else {
      addDestination(destination);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === destination.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? destination.images.length - 1 : prev - 1
    );
  };

  const schedule = language === 'pt' ? destination.schedule : destination.scheduleEn;
  const difficulty = language === 'pt' ? destination.difficulty : destination.difficultyEn;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header com imagem */}
        <div className="relative h-64 md:h-80">
          <img
            src={destination.images[currentImageIndex]}
            alt={language === 'pt' ? destination.name : destination.nameEn}
            className="w-full h-full object-cover"
          />
          
          {/* Navegação da galeria */}
          {destination.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {destination.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Botão fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
          >
            <i className="fa-solid fa-times"></i>
          </button>

          {/* Categoria */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-black bg-opacity-50 text-white rounded-full text-sm">
              <i className={`${destination.icon} mr-1`}></i>
              {language === 'pt' ? destination.category : destination.categoryEn}
            </span>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-6">
          {/* Título e ações */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {language === 'pt' ? destination.name : destination.nameEn}
              </h2>
              <p className="text-gray-600">
                {language === 'pt' ? destination.description : destination.descriptionEn}
              </p>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <FavoriteButton destination={destination} />
              <ShareButton destination={destination} />
              <button
                onClick={toggleInRoute}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isInRoute 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {isInRoute 
                  ? t('Remover da Rota', 'Remove from Route') 
                  : t('Adicionar à Rota', 'Add to Route')
                }
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b mb-6">
            <nav className="flex space-x-8">
              {['info', 'schedule', 'contact', 'tips'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'info' && t('Informações', 'Information')}
                  {tab === 'schedule' && t('Horários', 'Schedule')}
                  {tab === 'contact' && t('Contato', 'Contact')}
                  {tab === 'tips' && t('Dicas', 'Tips')}
                </button>
              ))}
            </nav>
          </div>

          {/* Conteúdo das tabs */}
          <div className="min-h-[200px]">
            {activeTab === 'info' && (
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  {language === 'pt' ? destination.fullDescription : destination.fullDescriptionEn}
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">
                      <i className="fa-solid fa-info-circle mr-2"></i>
                      {t('Detalhes', 'Details')}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('Duração:', 'Duration:')}</span>
                        <span className="font-medium">{language === 'pt' ? destination.duration : destination.durationEn}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('Dificuldade:', 'Difficulty:')}</span>
                        <span className={`font-medium ${
                          difficulty === 'Fácil' || difficulty === 'Easy' ? 'text-green-600' :
                          difficulty === 'Moderada' || difficulty === 'Moderate' ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">
                      <i className="fa-solid fa-star mr-2"></i>
                      {t('Destaques', 'Highlights')}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(language === 'pt' ? destination.highlights : destination.highlightsEn).map((highlight, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    <i className="fa-solid fa-clock mr-2"></i>
                    {t('Horários de Funcionamento', 'Opening Hours')}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('Segunda a Sexta:', 'Monday to Friday:')}</span>
                      <span className="font-medium">{schedule.weekdays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('Fins de Semana:', 'Weekends:')}</span>
                      <span className="font-medium">{schedule.weekends}</span>
                    </div>
                    {schedule.closed !== 'Nunca fechado' && schedule.closed !== 'Never closed' && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('Fechado:', 'Closed:')}</span>
                        <span className="font-medium text-red-600">{schedule.closed}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {destination.contacts.phone && (
                    <a
                      href={`tel:${destination.contacts.phone}`}
                      className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <i className="fa-solid fa-phone text-blue-600 text-xl mr-3"></i>
                      <div>
                        <div className="font-medium text-gray-800">{t('Telefone', 'Phone')}</div>
                        <div className="text-sm text-gray-600">{destination.contacts.phone}</div>
                      </div>
                    </a>
                  )}
                  
                  {destination.contacts.whatsapp && (
                    <a
                      href={`https://wa.me/55${destination.contacts.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <i className="fa-brands fa-whatsapp text-green-600 text-xl mr-3"></i>
                      <div>
                        <div className="font-medium text-gray-800">WhatsApp</div>
                        <div className="text-sm text-gray-600">{destination.contacts.whatsapp}</div>
                      </div>
                    </a>
                  )}
                  
                  {destination.contacts.instagram && (
                    <a
                      href={`https://instagram.com/${destination.contacts.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
                    >
                      <i className="fa-brands fa-instagram text-pink-600 text-xl mr-3"></i>
                      <div>
                        <div className="font-medium text-gray-800">Instagram</div>
                        <div className="text-sm text-gray-600">{destination.contacts.instagram}</div>
                      </div>
                    </a>
                  )}
                  
                  {destination.contacts.email && (
                    <a
                      href={`mailto:${destination.contacts.email}`}
                      className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <i className="fa-solid fa-envelope text-gray-600 text-xl mr-3"></i>
                      <div>
                        <div className="font-medium text-gray-800">Email</div>
                        <div className="text-sm text-gray-600">{destination.contacts.email}</div>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'tips' && (
              <div className="space-y-6">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    <i className="fa-solid fa-lightbulb mr-2 text-yellow-600"></i>
                    {t('Dicas de Visitação', 'Visiting Tips')}
                  </h4>
                  <p className="text-sm text-gray-700">
                    {language === 'pt' ? destination.tips : destination.tipsEn}
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    <i className="fa-solid fa-cloud-sun mr-2 text-blue-600"></i>
                    {t('Clima e Época', 'Weather & Season')}
                  </h4>
                  <p className="text-sm text-gray-700">
                    {language === 'pt' ? destination.weather : destination.weatherEn}
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    <i className="fa-solid fa-shirt mr-2 text-green-600"></i>
                    {t('O que Vestir', 'What to Wear')}
                  </h4>
                  <p className="text-sm text-gray-700">
                    {language === 'pt' ? destination.clothing : destination.clothingEn}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}