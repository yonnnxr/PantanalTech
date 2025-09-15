import { useLanguage } from '../contexts/LanguageContext';

export default function ModalTabContent({ activeTab, destination }) {
  const { language, t } = useLanguage();

  // Verificar se destination existe
  if (!destination) {
    return null;
  }

  // Verificar se schedule existe
  const schedule = language === 'pt' ? (destination.schedule || '') : (destination.scheduleEn || '');
  const difficulty = language === 'pt' ? (destination.difficulty || '') : (destination.difficultyEn || '');

  if (activeTab === 'info') {
    return (
      <div className="space-y-6">
        <p className="text-gray-700 leading-relaxed">
          {language === 'pt' ? (destination.fullDescription || '') : (destination.fullDescriptionEn || '')}
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
                <span className="font-medium">{destination.duration || t('Não especificada', 'Not specified')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('Dificuldade:', 'Difficulty:')}</span>
                <span className="font-medium">{difficulty || t('Não especificada', 'Not specified')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('Distância:', 'Distance:')}</span>
                <span className="font-medium">{destination.distance || t('Não especificada', 'Not specified')}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">
              <i className="fa-solid fa-map-marker-alt mr-2"></i>
              {t('Localização', 'Location')}
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">{t('Cidade:', 'City:')}</span>
                <span className="font-medium">{destination.city || t('Não especificada', 'Not specified')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('Estado:', 'State:')}</span>
                <span className="font-medium">{destination.state || t('Não especificado', 'Not specified')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('Região:', 'Region:')}</span>
                <span className="font-medium">{destination.region || t('Não especificada', 'Not specified')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'schedule') {
    return (
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">
            <i className="fa-solid fa-clock mr-2 text-blue-600"></i>
            {t('Horário de Funcionamento', 'Opening Hours')}
          </h4>
          <p className="text-sm text-gray-700">
            {schedule || t('Não especificado', 'Not specified')}
          </p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">
            <i className="fa-solid fa-calendar mr-2 text-green-600"></i>
            {t('Melhor Época', 'Best Season')}
          </h4>
          <p className="text-sm text-gray-700">
            {language === 'pt' ? (destination.bestSeason || '') : (destination.bestSeasonEn || '')}
          </p>
        </div>
        
        <div className="bg-orange-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">
            <i className="fa-solid fa-users mr-2 text-orange-600"></i>
            {t('Capacidade', 'Capacity')}
          </h4>
          <p className="text-sm text-gray-700">
            {language === 'pt' ? (destination.capacity || '') : (destination.capacityEn || '')}
          </p>
        </div>
      </div>
    );
  }

  if (activeTab === 'contact') {
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">
              <i className="fa-solid fa-phone mr-2"></i>
              {t('Contato', 'Contact')}
            </h4>
            <div className="space-y-2 text-sm">
              {destination.contacts && destination.contacts.phone && (
                <div className="flex items-center">
                  <span className="text-gray-600 w-20">{t('Telefone:', 'Phone:')}</span>
                  <a href={`tel:${destination.contacts.phone}`} className="text-blue-600 hover:underline">
                    {destination.contacts.phone}
                  </a>
                </div>
              )}
              {destination.contacts && destination.contacts.email && (
                <div className="flex items-center">
                  <span className="text-gray-600 w-20">{t('Email:', 'Email:')}</span>
                  <a href={`mailto:${destination.contacts.email}`} className="text-blue-600 hover:underline">
                    {destination.contacts.email}
                  </a>
                </div>
              )}
              {destination.contacts && destination.contacts.website && (
                <div className="flex items-center">
                  <span className="text-gray-600 w-20">{t('Website:', 'Website:')}</span>
                  <a href={destination.contacts.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {destination.contacts.website}
                  </a>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">
              <i className="fa-solid fa-map-marker-alt mr-2"></i>
              {t('Endereço', 'Address')}
            </h4>
            <p className="text-sm text-gray-700">
              {language === 'pt' ? (destination.address || '') : (destination.addressEn || '')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'tips') {
    return (
      <div className="space-y-6">
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">
            <i className="fa-solid fa-lightbulb mr-2 text-yellow-600"></i>
            {t('Dicas de Visitação', 'Visiting Tips')}
          </h4>
          <p className="text-sm text-gray-700">
            {language === 'pt' ? (destination.tips || '') : (destination.tipsEn || '')}
          </p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">
            <i className="fa-solid fa-cloud-sun mr-2 text-blue-600"></i>
            {t('Clima e Época', 'Weather & Season')}
          </h4>
          <p className="text-sm text-gray-700">
            {language === 'pt' ? (destination.weather || '') : (destination.weatherEn || '')}
          </p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">
            <i className="fa-solid fa-shirt mr-2 text-green-600"></i>
            {t('O que Vestir', 'What to Wear')}
          </h4>
          <p className="text-sm text-gray-700">
            {language === 'pt' ? (destination.clothing || '') : (destination.clothingEn || '')}
          </p>
        </div>
      </div>
    );
  }

  return null;
} 