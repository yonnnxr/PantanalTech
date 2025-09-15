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

  // Verificar se variant é válida
  const validVariant = variants[variant] ? variant : "default";
  const validTextColor = textColors[validVariant] || "text-gray-800";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[10000] ${variants[validVariant]} ${className}`} style={{ zIndex: 10000 }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 h-full">
        {/* Logo à esquerda */}
        <div className="flex-shrink-0 flex items-center h-full">
          {showLogo && (
            <Logo 
              size="xxlarge" 
              textColor={validTextColor}
              className="hover:opacity-90 transition-opacity"
            />
          )}
        </div>
        
        {/* Itens centralizados - apenas quando necessário */}
        <div className="flex-1 flex items-center justify-center">
          {(showBackButton || title || children) && (
            <div className="flex items-center gap-8">
              {showBackButton && (
                <button
                  onClick={() => {
                    if (onBackClick && typeof onBackClick === 'function') {
                      onBackClick();
                    }
                  }}
                  className={`flex items-center ${validTextColor} hover:opacity-80 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded text-sm`}
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
          )}
        </div>
        
        {/* Botões à direita */}
        <div className="flex-shrink-0 flex items-center gap-1 h-full">
          {showThemeToggle && <ThemeToggle />}
          {showLanguageToggle && <LanguageToggle textColor={validTextColor} />}
        </div>
      </div>
    </nav>
  );
} 