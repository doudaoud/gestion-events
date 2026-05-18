
import { Search, Calendar, MapPin } from 'lucide-react';

const SearchBar = () => {
  return (
    // Conteneur principal avec ombre et bords arrondis
    <div className="flex items-center bg-white p-2 rounded-2xl shadow-sm border border-gray-100 gap-3 w-fit mx-auto">
      
      {/* 1. Champ Événement */}
      <div className="flex items-center px-3 py-2.5 bg-white border border-gray-200 rounded-xl focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all w-48">
        <Search className="w-5 h-5 text-gray-400 mr-2" />
        <input 
          type="text" 
          placeholder="Find an event" 
          className="bg-transparent outline-none w-full text-sm text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* 2. Champ Date */}
      <div className="flex items-center px-3 py-2.5 bg-white border border-gray-200 rounded-xl focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all w-48">
        <Calendar className="w-5 h-5 text-gray-400 mr-2" />
        <input 
          type="date" 
          placeholder="Select date" 
          className="bg-transparent outline-none w-full text-sm text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* 3. Champ Localisation */}
      <div className="flex items-center px-3 py-2.5 bg-white border border-gray-200 rounded-xl focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all w-48">
        <MapPin className="w-5 h-5 text-gray-400 mr-2" />
        <input 
          type="text" 
          placeholder="Anywhere" 
          className="bg-transparent outline-none w-full text-sm text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* 4. Bouton de recherche */}
      <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-6 rounded-xl transition-colors text-sm">
        Search
      </button>

    </div>
  );
};

export default SearchBar;