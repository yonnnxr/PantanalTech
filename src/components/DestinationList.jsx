const categoryColors = {
  'Mirante': 'bg-orange-100 text-orange-800',
  'Serra': 'bg-green-100 text-green-800',
  'Cultural': 'bg-purple-100 text-purple-800',
  'Cachoeira': 'bg-blue-100 text-blue-800',
  'Turismo Rural': 'bg-yellow-100 text-yellow-800',
  'Histórico': 'bg-red-100 text-red-800',
};

const difficultyColors = {
  'Fácil': 'text-green-600',
  'Moderada': 'text-yellow-600',
  'Difícil': 'text-red-600',
};

export default function DestinationList({ destinations, onSelect, selectedId }) {
  return (
    <div className="space-y-2 p-4">
      {destinations.map((dest) => (
        <div
          key={dest.id}
          className={`p-4 cursor-pointer rounded-lg border transition-all ${
            dest.id === selectedId 
              ? 'bg-blue-50 border-blue-300 shadow-md' 
              : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
          }`}
          onClick={() => onSelect(dest)}
        >
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-800">{dest.name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[dest.category]}`}>
              {dest.category}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {dest.description}
          </p>
          
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span className={difficultyColors[dest.difficulty]}>● {dest.difficulty}</span>
            <span>⏱️ {dest.duration}</span>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {dest.highlights.slice(0, 2).map((highlight, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                {highlight}
              </span>
            ))}
            {dest.highlights.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{dest.highlights.length - 2}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
