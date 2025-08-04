import { useState } from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { fontSize, highContrast, increaseFontSize, decreaseFontSize, toggleHighContrast } = useAccessibility();
  const { t } = useLanguage();

  return (
    <>
      {/* Botão de acessibilidade flutuante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-[9998] bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        aria-label={t('Opções de acessibilidade', 'Accessibility options')}
      >
        <i className='fa-solid fa-gear'></i>
      </button>

      {/* Painel de acessibilidade */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-[9998] bg-white border border-gray-300 rounded-lg shadow-xl p-4 w-64">
          <h3 className="font-bold mb-4 text-gray-800">
            {t('Acessibilidade', 'Accessibility')}
          </h3>
          
          {/* Controle de fonte */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('Tamanho da fonte', 'Font size')}
            </label>
            <div className="flex gap-2">
              <button
                onClick={decreaseFontSize}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
                disabled={fontSize === 'normal'}
              >
                A-
              </button>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                {fontSize === 'normal' && 'A'}
                {fontSize === 'large' && 'A+'}
                {fontSize === 'extra-large' && 'A++'}
              </span>
              <button
                onClick={increaseFontSize}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
                disabled={fontSize === 'extra-large'}
              >
                A+
              </button>
            </div>
          </div>

          {/* Contraste alto */}
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={highContrast}
                onChange={toggleHighContrast}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">
                {t('Alto contraste', 'High contrast')}
              </span>
            </label>
          </div>

          {/* Informações sobre leitores de tela */}
          <div className="text-xs text-gray-600">
            <p className="mb-2">
              {t('Site otimizado para leitores de tela', 'Site optimized for screen readers')}
            </p>
            <p>
              {t('Use Tab para navegar entre elementos', 'Use Tab to navigate between elements')}
            </p>
          </div>
        </div>
      )}
    </>
  );
}