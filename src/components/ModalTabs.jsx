import { useLanguage } from '../contexts/LanguageContext';

export default function ModalTabs({ activeTab, onTabChange }) {
  const { t } = useLanguage();

  const tabs = [
    { id: 'info', label: t('Informações', 'Information') },
    { id: 'schedule', label: t('Horários', 'Schedule') },
    { id: 'contact', label: t('Contato', 'Contact') },
    { id: 'tips', label: t('Dicas', 'Tips') }
  ];

  return (
    <div className="border-b mb-6 relative z-10">
      <nav className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={(e) => {
              e.stopPropagation();
              if (onTabChange && typeof onTabChange === 'function') {
                onTabChange(tab.id);
              }
            }}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            aria-label={tab.label}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
} 