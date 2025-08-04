import { Link } from 'react-router-dom';
import logoImage from '../assets/images/logo/Pantanal (1).png';

export default function Logo({ 
  className = "", 
  showText = true, 
  size = "medium",
  linkTo = "/",
  textColor = "text-gray-800"
}) {
  const sizeClasses = {
    small: "h-8 w-8",
    medium: "h-10 w-10", 
    large: "h-12 w-12",
    xlarge: "h-16 w-16"
  };

  const textSizes = {
    small: "text-lg",
    medium: "text-xl",
    large: "text-2xl", 
    xlarge: "text-3xl"
  };

  return (
    <Link 
      to={linkTo} 
      className={`flex items-center space-x-3 hover:opacity-80 transition-opacity duration-300 ${className}`}
    >
      <img 
        src={logoImage} 
        alt="Rota Serra & Paxixi Logo" 
        className={`${sizeClasses[size]} object-contain`}
      />
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold tracking-wide ${textSizes[size]} ${textColor}`}>
            Rota Serra & Paxixi
          </span>
          <span className={`text-xs opacity-75 ${textColor}`}>
            Aquidauana - MS
          </span>
        </div>
      )}
    </Link>
  );
} 