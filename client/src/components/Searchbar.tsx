import { Search, Calendar, MapPin } from 'lucide-react';
import './searchbar.css';

const SearchBar = () => {
  return (
    <div className="searchbar-container">

      {/* 1. Champ Événement */}
      <div className="searchbar-field">
        <Search className="searchbar-icon" size={18} />
        <input
          type="text"
          placeholder="Find an event"
          className="searchbar-input"
        />
      </div>

      {/* Séparateur */}
      <div className="searchbar-divider" />

      {/* 2. Champ Date */}
      <div className="searchbar-field">
        <Calendar className="searchbar-icon" size={18} />
        <input
          type="date"
          placeholder="Select date"
          className="searchbar-input"
        />
      </div>

      {/* Séparateur */}
      <div className="searchbar-divider" />

      {/* 3. Champ Localisation */}
      <div className="searchbar-field">
        <MapPin className="searchbar-icon" size={18} />
        <input
          type="text"
          placeholder="Anywhere"
          className="searchbar-input"
        />
      </div>

      {/* 4. Bouton de recherche */}
      <button className="searchbar-btn">
        Search
      </button>

    </div>
  );
};

export default SearchBar;