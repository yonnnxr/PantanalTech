import { useLanguage } from '../contexts/LanguageContext';

export default function ConfirmationModal({ 
  showConfirmation, 
  pendingAction, 
  onConfirm, 
  onCancel 
}) {
  const { t } = useLanguage();

  if (!showConfirmation) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 modal-backdrop modal-center p-4 z-[10000]">
      <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl modal-content">
        <div className="text-center">
          <div className="text-4xl mb-4">
            {pendingAction === 'remove' ? '⚠️' : '❓'}
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {pendingAction === 'remove' 
              ? t('Remover da Rota?', 'Remove from Route?')
              : t('Confirmar Ação', 'Confirm Action')
            }
          </h3>
          <p className="text-gray-600 mb-6">
            {pendingAction === 'remove'
              ? t('Tem certeza que deseja remover este destino da sua rota?', 'Are you sure you want to remove this destination from your route?')
              : t('Deseja confirmar esta ação?', 'Do you want to confirm this action?')
            }
          </p>
          
          <div className="flex gap-3 justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCancel();
              }}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              {t('Cancelar', 'Cancel')}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onConfirm();
              }}
              className={`px-6 py-2 rounded-lg transition-colors ${
                pendingAction === 'remove'
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {pendingAction === 'remove'
                ? t('Remover', 'Remove')
                : t('Confirmar', 'Confirm')
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 