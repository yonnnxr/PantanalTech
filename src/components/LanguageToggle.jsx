import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageToggle({ textColor = "text-white" }) {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center space-x-2 px-3 py-2 bg-transparent hover:bg-black/10 rounded-lg transition-colors ${textColor}`}
      aria-label={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
    >
      <span className="text-sm font-medium">
        {language === 'pt' ? '🇧🇷 PT' : '🇺🇸 EN'}
      </span>
    </button>
  );
}