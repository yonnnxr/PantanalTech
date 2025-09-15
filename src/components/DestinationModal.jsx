import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useRoute } from '../contexts/RouteContext';
import { useModal } from '../contexts/ModalContext';
import ModalHeader from './ModalHeader';
import ModalActions from './ModalActions';
import ModalTabs from './ModalTabs';
import ModalTabContent from './ModalTabContent';
import ConfirmationModal from './ConfirmationModal';

export default function DestinationModal({ destination, isOpen, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('info');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const { language, t } = useLanguage();
  const { addDestination, removeDestination, selectedDestinations } = useRoute();
  const { openModal, closeModal, isModalOpen } = useModal();

  // Verificar se destination existe
  if (!destination) {
    return null;
  }

  const modalId = `destination-${destination.id}`;

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
      setActiveTab('info');
      setShowConfirmation(false);
      setPendingAction(null);
      // Só abrir modal se não estiver já aberto
      if (openModal && typeof openModal === 'function' && !isModalOpen(modalId)) {
        openModal(modalId);
      }
    } else {
      if (closeModal && typeof closeModal === 'function') {
        closeModal(modalId);
      }
    }
  }, [isOpen, modalId]);

  if (!isOpen || !destination) return null;

  // Verificar se selectedDestinations é um array válido
  const validSelectedDestinations = Array.isArray(selectedDestinations) ? selectedDestinations : [];
  const isInRoute = validSelectedDestinations.some(d => d.id === destination.id);

  const handleClose = () => {
    // Se há uma ação pendente, mostra confirmação
    if (pendingAction) {
      setShowConfirmation(true);
      return;
    }
    
    // Se o destino está na rota, pergunta se quer remover
    if (isInRoute) {
      setPendingAction('remove');
      setShowConfirmation(true);
      return;
    }
    
    // Fecha o modal e limpa o estado
    if (closeModal && typeof closeModal === 'function') {
      closeModal(modalId);
    }
    if (onClose && typeof onClose === 'function') {
      onClose();
    }
  };

  const handleConfirmAction = () => {
    if (pendingAction === 'remove' && removeDestination && typeof removeDestination === 'function') {
      removeDestination(destination.id);
    }
    setShowConfirmation(false);
    setPendingAction(null);
    if (onClose && typeof onClose === 'function') {
      onClose();
    }
  };

  const handleCancelAction = () => {
    setShowConfirmation(false);
    setPendingAction(null);
  };

  const handleToggleRoute = () => {
    if (isInRoute) {
      setPendingAction('remove');
      setShowConfirmation(true);
    } else {
      if (addDestination && typeof addDestination === 'function') {
        addDestination(destination);
      }
      // Mostra feedback visual
      setTimeout(() => {
        if (onClose && typeof onClose === 'function') {
          onClose();
        }
      }, 1000);
    }
  };

  const handleImageChange = (newIndex) => {
    // Verificar se newIndex é um número válido
    if (typeof newIndex === 'number' && newIndex >= 0) {
      setCurrentImageIndex(newIndex);
    }
  };

  const handleTabChange = (tabId) => {
    // Verificar se tabId é uma string válida
    if (typeof tabId === 'string') {
      setActiveTab(tabId);
    }
  };

  try {
    return createPortal(
      <>
        {/* Modal Principal */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 modal-backdrop modal-center p-4"
          style={{ zIndex: 10000 }}
          onClick={handleClose}
        >
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl modal-content">
          {/* Header com imagem */}
          <ModalHeader 
            destination={destination}
            currentImageIndex={currentImageIndex}
            onImageChange={handleImageChange}
            onClose={handleClose}
          />

          {/* Conteúdo */}
          <div className="p-6">
            {/* Título e ações */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {language === 'pt' ? destination.name : destination.nameEn}
                </h2>
                <p className="text-gray-600">
                  {language === 'pt' ? destination.description : destination.descriptionEn}
                </p>
              </div>
              <ModalActions 
                destination={destination}
                isInRoute={isInRoute}
                onToggleRoute={handleToggleRoute}
              />
            </div>

            {/* Tabs */}
            <ModalTabs 
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />

            {/* Conteúdo das tabs */}
            <div className="min-h-[200px]">
              <ModalTabContent 
                activeTab={activeTab}
                destination={destination}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Confirmação */}
      <ConfirmationModal 
        showConfirmation={showConfirmation}
        pendingAction={pendingAction}
        onConfirm={handleConfirmAction}
        onCancel={handleCancelAction}
      />
    </>,
    document.body
  );
  } catch (error) {
    console.error('Erro ao renderizar DestinationModal:', error);
    return null;
  }
}