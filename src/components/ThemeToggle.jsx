import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${className}`}
      title={theme === 'light' 
        ? t('Ativar modo escuro', 'Enable dark mode')
        : t('Ativar modo claro', 'Enable light mode')
      }
    >
      {theme === 'light' ? (
        <i className="fa-solid fa-moon text-gray-600 dark:text-gray-300"></i>
      ) : (
        <i className="fa-solid fa-sun text-yellow-500"></i>
      )}
    </button>
  );
}