import { Link } from 'react-router-dom';
import logoImage from '../assets/images/logo/logo.png';

export default function Logo({ 
  className = "", 
  size = "medium",
  linkTo = "/",
  textColor = "text-gray-800"
}) {
  const sizeClasses = {
    tiny: "h-4 w-4 sm:h-5 sm:w-5",
    small: "h-6 w-6 sm:h-8 sm:w-8",
    medium: "h-8 w-8 sm:h-10 sm:w-10", 
    large: "h-10 w-10 sm:h-12 sm:w-12",
    xlarge: "h-12 w-12 sm:h-16 sm:w-16",
    xxlarge: "h-16 w-16 sm:h-20 sm:w-20",
    xxxlarge: "h-20 w-20 sm:h-24 sm:w-24",
    huge: "h-24 w-24 sm:h-32 sm:w-32"
  };

  // Verificar se size é válido
  const validSize = sizeClasses[size] ? size : "medium";

  return (
    <Link 
      to={linkTo} 
      className={`flex items-center hover:opacity-80 transition-opacity logo-container ${className}`}
    >
      <img 
        src={logoImage} 
        alt="Rota Serra e Charme Paxixi Logo" 
        className={`${sizeClasses[validSize]} object-contain flex-shrink-0`}
        style={{ minWidth: 'auto', minHeight: 'auto' }}
        onError={(e) => {
          // Imagem de fallback caso a logo não carregue
          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPmxvZ288L3RleHQ+PC9zdmc+';
        }}
      />
    </Link>
  );
} 