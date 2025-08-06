import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function ShareButton({ destination, className = "" }) {
  const [showOptions, setShowOptions] = useState(false);
  const { t } = useLanguage();

  const shareUrl = `${window.location.origin}/?destination=${destination.id}`;
  const shareText = `Confira este destino incrível: ${destination.name}`;

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: 'fab fa-whatsapp',
      color: 'text-green-600',
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
    },
    {
      name: 'Facebook',
      icon: 'fab fa-facebook',
      color: 'text-blue-600',
      url: `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Twitter',
      icon: 'fab fa-twitter',
      color: 'text-blue-400',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Email',
      icon: 'fa-solid fa-envelope',
      color: 'text-gray-600',
      url: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert(t('Link copiado!', 'Link copied!'));
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="p-2 rounded-full text-gray-400 hover:text-blue-500 transition-colors"
        title={t('Compartilhar', 'Share')}
      >
        <i className="fa-solid fa-share-alt"></i>
      </button>

      {showOptions && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border p-2 z-[10001] min-w-[200px]">
          <div className="text-sm font-medium text-gray-800 mb-2 px-2">
            {t('Compartilhar', 'Share')}
          </div>
          
          {shareOptions.map((option) => (
            <a
              key={option.name}
              href={option.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded text-sm transition-colors"
              onClick={() => setShowOptions(false)}
            >
              <i className={`${option.icon} ${option.color}`}></i>
              {option.name}
            </a>
          ))}
          
          <button
            onClick={() => {
              copyToClipboard();
              setShowOptions(false);
            }}
            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded text-sm transition-colors w-full text-left"
          >
            <i className="fa-solid fa-copy text-gray-600"></i>
            {t('Copiar link', 'Copy link')}
          </button>
        </div>
      )}
    </div>
  );
}