import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

export default function Navbar({ 
  variant = "default", // default, transparent, map
  showBackButton = false,
  onBackClick,
  title,
  showLogo = true,
  showThemeToggle = true,
  showLanguageToggle = true,
  className = "",
  children
}) {
  const { t } = useLanguage();

  const variants = {
    default: "bg-white shadow-md",
    transparent: "backdrop-blur-sm bg-black/30",
    map: "bg-white shadow-sm border-b"
  };

  const textColors = {
    default: "text-gray-800",
    transparent: "text-white",
    map: "text-gray-800"
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[10000] ${variants[variant]} ${className}`} style={{ zIndex: 10000 }}>
      <div className="max-w-7xl mx-auto flex items-center px-4 py-2">
        {/* Logo à esquerda */}
        <div className="flex items-center">
          {showLogo && (
            <Logo 
              size="xxlarge" 
              textColor={textColors[variant]}
              className="hover:opacity-90 transition-opacity"
            />
          )}
        </div>
        
        {/* Itens centralizados */}
        <div className="flex-1 flex items-center justify-center gap-4">
          {showBackButton && (
            <button
              onClick={onBackClick}
              className={`flex items-center ${textColors[variant]} hover:opacity-80 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded text-sm`}
              aria-label={t('Voltar à página anterior', 'Go back to previous page')}
            >
              <i className="fa-solid fa-arrow-left mr-1 text-xs"></i>
              <span className="hidden sm:inline text-xs">{t('Voltar', 'Back')}</span>
            </button>
          )}
          
          {title && (
            <span className="text-xs text-gray-600">/ {title}</span>
          )}
          
          {children}
        </div>
        
        {/* Botões à direita */}
        <div className="flex items-center gap-1">
          {showThemeToggle && <ThemeToggle />}
          {showLanguageToggle && <LanguageToggle textColor={textColors[variant]} />}
        </div>
      </div>
    </nav>
  );
} 