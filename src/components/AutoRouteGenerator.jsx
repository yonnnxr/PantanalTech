import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useRoute } from '../contexts/RouteContext';
import { DESTINATIONS } from '../data/destinations';

export default function AutoRouteGenerator() {
  const [preferences, setPreferences] = useState({
    duration: 'half-day', // half-day, full-day, weekend
    interests: [], // trilhas, cultura, gastronomia, hospedagem
    difficulty: 'any', // easy, moderate, hard, any
    budget: 'medium' // low, medium, high
  });
  const [generatedRoute, setGeneratedRoute] = useState(null);
  const [loading, setLoading] = useState(false);
  const { language, t } = useLanguage();
  const { setSelectedDestinations } = useRoute();

  const interestOptions = [
    { id: 'trilhas', label: t('Trilhas e Ecoturismo', 'Trails and Ecotourism'), icon: 'fa-solid fa-mountain' },
    { id: 'cultura', label: t('Cultura e História', 'Culture and History'), icon: 'fa-solid fa-building' },
    { id: 'gastronomia', label: t('Gastronomia Local', 'Local Gastronomy'), icon: 'fa-solid fa-utensils' },
    { id: 'hospedagem', label: t('Hospedagem', 'Accommodation'), icon: 'fa-solid fa-bed' }
  ];

  const generateRoute = async () => {
    setLoading(true);
    
    // Simular processamento da IA
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Algoritmo simples de seleção baseado nas preferências
    let filteredDestinations = [...DESTINATIONS];
    
    // Filtrar por interesses
    if (preferences.interests.length > 0) {
      filteredDestinations = filteredDestinations.filter(dest => {
        const categoryMap = {
          'trilhas': 'Trilhas e ecoturismo',
          'cultura': 'Turismo cultural',
          'gastronomia': 'Gastronomia local',
          'hospedagem': 'Hospedagens e guias credenciados'
        };
        
        return preferences.interests.some(interest => 
          dest.category === categoryMap[interest]
        );
      });
    }
    
    // Filtrar por dificuldade
    if (preferences.difficulty !== 'any') {
      const difficultyMap = {
        'easy': language === 'pt' ? 'Fácil' : 'Easy',
        'moderate': language === 'pt' ? 'Moderada' : 'Moderate',
        'hard': language === 'pt' ? 'Difícil' : 'Hard'
      };
      
      filteredDestinations = filteredDestinations.filter(dest => 
        (language === 'pt' ? dest.difficulty : dest.difficultyEn) === difficultyMap[preferences.difficulty]
      );
    }
    
    // Selecionar quantidade baseada na duração
    const maxDestinations = {
      'half-day': 2,
      'full-day': 4,
      'weekend': 6
    }[preferences.duration];
    
    // Embaralhar e selecionar
    const shuffled = filteredDestinations.sort(() => 0.5 - Math.random());
    const selectedDests = shuffled.slice(0, maxDestinations);
    
    // Calcular custos estimados
    const baseCosts = {
      'low': { fuel: 15, food: 25, entry: 10 },
      'medium': { fuel: 25, food: 45, entry: 20 },
      'high': { fuel: 40, food: 80, entry: 35 }
    };
    
    const costs = baseCosts[preferences.budget];
    const totalCost = costs.fuel + (costs.food * selectedDests.length) + (costs.entry * selectedDests.length);
    
    const route = {
      destinations: selectedDests,
      summary: {
        duration: {
          'half-day': t('Meio dia (4-5 horas)', 'Half day (4-5 hours)'),
          'full-day': t('Dia inteiro (8-10 horas)', 'Full day (8-10 hours)'),
          'weekend': t('Final de semana (2 dias)', 'Weekend (2 days)')
        }[preferences.duration],
        distance: `${(selectedDests.length * 12 + Math.random() * 20).toFixed(1)} km`,
        estimatedCost: `R$ ${totalCost}`,
        breakdown: {
          fuel: `R$ ${costs.fuel}`,
          food: `R$ ${costs.food * selectedDests.length}`,
          entries: `R$ ${costs.entry * selectedDests.length}`
        }
      },
      schedule: selectedDests.map((dest, index) => ({
        time: `${8 + (index * 2)}:00`,
        destination: dest,
        duration: language === 'pt' ? dest.duration : dest.durationEn,
        activity: t('Explorar e fotografar', 'Explore and photograph')
      }))
    };
    
    setGeneratedRoute(route);
    setLoading(false);
  };

  const applyRoute = () => {
    if (generatedRoute) {
      setSelectedDestinations(generatedRoute.destinations);
      // Scroll para a seção de rota
      document.getElementById('roteiro')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInterestToggle = (interest) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          <i className="fa-solid fa-magic-wand-sparkles mr-3 text-blue-600"></i>
          {t('Gerador de Roteiro Inteligente', 'Smart Itinerary Generator')}
        </h2>
        <p className="text-gray-600">
          {t(
            'Responda algumas perguntas e deixe nossa IA criar o roteiro perfeito para você',
            'Answer a few questions and let our AI create the perfect itinerary for you'
          )}
        </p>
      </div>

      {!generatedRoute ? (
        <div className="space-y-8">
          {/* Duração */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {t('Quanto tempo você tem disponível?', 'How much time do you have available?')}
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { id: 'half-day', label: t('Meio Dia', 'Half Day'), desc: t('4-5 horas', '4-5 hours') },
                { id: 'full-day', label: t('Dia Inteiro', 'Full Day'), desc: t('8-10 horas', '8-10 hours') },
                { id: 'weekend', label: t('Final de Semana', 'Weekend'), desc: t('2 dias', '2 days') }
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setPreferences(prev => ({ ...prev, duration: option.id }))}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    preferences.duration === option.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-gray-500">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Interesses */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {t('Quais são seus interesses?', 'What are your interests?')}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {interestOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleInterestToggle(option.id)}
                  className={`flex items-center p-4 rounded-lg border-2 transition-all ${
                    preferences.interests.includes(option.id)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <i className={`${option.icon} text-2xl mr-4`}></i>
                  <span className="font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dificuldade */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {t('Nível de dificuldade preferido?', 'Preferred difficulty level?')}
            </h3>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { id: 'any', label: t('Qualquer', 'Any') },
                { id: 'easy', label: t('Fácil', 'Easy') },
                { id: 'moderate', label: t('Moderada', 'Moderate') },
                { id: 'hard', label: t('Difícil', 'Hard') }
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setPreferences(prev => ({ ...prev, difficulty: option.id }))}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    preferences.difficulty === option.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Orçamento */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {t('Qual seu orçamento aproximado?', 'What is your approximate budget?')}
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { id: 'low', label: t('Econômico', 'Budget'), desc: t('Até R$ 100', 'Up to R$ 100') },
                { id: 'medium', label: t('Moderado', 'Moderate'), desc: t('R$ 100-200', 'R$ 100-200') },
                { id: 'high', label: t('Confortável', 'Comfortable'), desc: t('Acima de R$ 200', 'Above R$ 200') }
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setPreferences(prev => ({ ...prev, budget: option.id }))}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    preferences.budget === option.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-gray-500">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Botão Gerar */}
          <div className="text-center pt-4">
            <button
              onClick={generateRoute}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-12 py-4 rounded-full text-lg font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin mr-3"></i>
                  {t('Gerando roteiro...', 'Generating itinerary...')}
                </>
              ) : (
                <>
                  <i className="fa-solid fa-magic-wand-sparkles mr-3"></i>
                  {t('Gerar Roteiro Inteligente', 'Generate Smart Itinerary')}
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Roteiro Gerado */
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              <i className="fa-solid fa-check-circle text-green-600 mr-2"></i>
              {t('Seu Roteiro Personalizado', 'Your Personalized Itinerary')}
            </h3>
            <p className="text-gray-600">
              {t('Baseado em suas preferências, criamos este roteiro otimizado', 'Based on your preferences, we created this optimized itinerary')}
            </p>
          </div>

          {/* Resumo */}
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6">
            <h4 className="text-xl font-bold text-gray-800 mb-4">
              {t('Resumo da Experiência', 'Experience Summary')}
            </h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{generatedRoute.summary.duration}</div>
                <div className="text-sm text-gray-600">{t('Duração', 'Duration')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{generatedRoute.summary.distance}</div>
                <div className="text-sm text-gray-600">{t('Distância', 'Distance')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{generatedRoute.summary.estimatedCost}</div>
                <div className="text-sm text-gray-600">{t('Custo Total', 'Total Cost')}</div>
              </div>
            </div>
          </div>

          {/* Cronograma */}
          <div>
            <h4 className="text-xl font-bold text-gray-800 mb-4">
              {t('Cronograma Sugerido', 'Suggested Schedule')}
            </h4>
            <div className="space-y-4">
              {generatedRoute.schedule.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-16 text-center">
                    <div className="text-lg font-bold text-blue-600">{item.time}</div>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-gray-800">
                      {language === 'pt' ? item.destination.name : item.destination.nameEn}
                    </h5>
                    <p className="text-sm text-gray-600">
                      {item.activity} • {item.duration}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <i className={`${item.destination.icon} text-2xl text-gray-400`}></i>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Breakdown de custos */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="text-lg font-bold text-gray-800 mb-4">
              {t('Detalhamento de Custos', 'Cost Breakdown')}
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">{t('Combustível:', 'Fuel:')}</span>
                <span className="font-medium">{generatedRoute.summary.breakdown.fuel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('Alimentação:', 'Food:')}</span>
                <span className="font-medium">{generatedRoute.summary.breakdown.food}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('Entradas:', 'Entries:')}</span>
                <span className="font-medium">{generatedRoute.summary.breakdown.entries}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>{t('Total:', 'Total:')}</span>
                <span className="text-blue-600">{generatedRoute.summary.estimatedCost}</span>
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={applyRoute}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              <i className="fa-solid fa-check mr-2"></i>
              {t('Usar Este Roteiro', 'Use This Itinerary')}
            </button>
            <button
              onClick={() => setGeneratedRoute(null)}
              className="bg-gray-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              <i className="fa-solid fa-redo mr-2"></i>
              {t('Gerar Novo Roteiro', 'Generate New Itinerary')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}