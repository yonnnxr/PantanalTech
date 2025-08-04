import { useLanguage } from '../contexts/LanguageContext';

const TRANSPORT_MODES = [
  { id: 'driving', icon: 'fa-solid fa-car', labelPt: 'Carro', labelEn: 'Car' },
  { id: 'cycling', icon: 'fa-solid fa-person-biking', labelPt: 'Bicicleta', labelEn: 'Bicycle' },
  { id: 'walking', icon: 'fa-solid fa-person-walking', labelPt: 'A pé', labelEn: 'Walking' },
];

export default function TransportModeSelector({ selectedMode, onModeChange }) {
  const { language, t } = useLanguage();

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <h3 className="font-semibold text-gray-800 mb-3">
        {t('Meio de transporte', 'Transportation mode')}
      </h3>
      <div className="flex gap-2">
        {TRANSPORT_MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
              selectedMode === mode.id
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300 text-gray-600'
            }`}
            aria-label={language === 'pt' ? mode.labelPt : mode.labelEn}
          >
            <i className={`${mode.icon} text-xl mb-1`}></i>
            <span className="text-xs font-medium">
              {language === 'pt' ? mode.labelPt : mode.labelEn}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}