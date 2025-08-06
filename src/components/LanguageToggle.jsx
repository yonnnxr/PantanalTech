import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageToggle({ textColor = "text-white" }) {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center space-x-1 px-2 py-1 bg-transparent hover:bg-black/10 rounded-lg transition-colors ${textColor}`}
      aria-label={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
    >
      <span className="text-xs font-medium">
        {language === 'pt' ? '🇧🇷 PT' : '🇺🇸 EN'}
      </span>
    </button>
  );
}