import { useLanguage } from '../contexts/LanguageContext';
import Logo from './Logo';

export default function AppFooter() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <Logo 
              size="huge" 
              textColor="text-white" 
              className="mb-4"
            />
            <p className="text-gray-400">
              {t(
                'Descubra as belezas naturais e culturais de Aquidauana no coração do Pantanal.',
                'Discover the natural and cultural beauties of Aquidauana in the heart of the Pantanal.'
              )}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t('Contato', 'Contact')}</h4>
            <p className="text-gray-400 mb-2"><i className="fa-solid fa-envelope mr-1"></i>info@rotaserra.com.br</p>
            <p className="text-gray-400 mb-2"><i className="fa-solid fa-phone mr-1"></i>(67) 3241-0000</p>
                            <p className="text-gray-400"><i className="fa-solid fa-location-dot mr-1"></i>Aquidauana, MS</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t('Siga-nos', 'Follow us')}</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">YouTube</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 {t('Rota Serra e Charme Paxixi. Todos os direitos reservados.', 'Rota Serra e Charme Paxixi. All rights reserved.')}</p>
        </div>
      </div>
    </footer>
  );
} 