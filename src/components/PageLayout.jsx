import { useLanguage } from '../contexts/LanguageContext';
import Navbar from './Navbar';
import Logo from './Logo';

// Componente de layout padrão para páginas
export const PageLayout = ({ 
  children, 
  title, 
  showBackButton = false,
  onBackClick,
  className = ""
}) => {
  const { t } = useLanguage();
  
  return (
    <div className={`min-h-screen bg-gradient-to-br from-green-50 to-blue-50 ${className}`}>
      <Navbar 
        variant="default"
        showBackButton={showBackButton}
        onBackClick={onBackClick}
        title={title}
      />

      {/* Conteúdo principal */}
      <main className="flex-1 pt-20" role="main">
        {children}
      </main>
    </div>
  );
};

// Componente para seções hero
export const HeroSection = ({ 
  title, 
  subtitle, 
  backgroundClass = "bg-gradient-to-r from-blue-600 to-teal-500",
  className = ""
}) => {
  return (
    <section className={`py-12 sm:py-16 ${backgroundClass} text-white ${className}`} role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
          {title}
        </h1>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto">
          {subtitle}
        </p>
      </div>
    </section>
  );
};

// Componente para seções de conteúdo
export const ContentSection = ({ 
  children, 
  className = "",
  containerClass = "max-w-7xl mx-auto px-4 sm:px-6"
}) => {
  return (
    <section className={`py-12 sm:py-16 ${className}`}>
      <div className={containerClass}>
        {children}
      </div>
    </section>
  );
};

// Componente para o footer padrão
export const PageFooter = ({ 
  logoSize = "huge",
  className = ""
}) => {
  const { t } = useLanguage();
  
  return (
    <footer className={`bg-gray-800 text-white py-8 sm:py-12 ${className}`} role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <Logo 
          size="medium" 
          textColor="text-white" 
          className="mb-4 sm:mb-6 mx-auto"
        />
        <p className="text-gray-400 text-sm sm:text-base">
          &copy; 2025 {t('Se acha pantanal. Todos os direitos reservados.', 'Se acha pantanal. All rights reserved.')}
        </p>
      </div>
    </footer>
  );
}; 