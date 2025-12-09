import { createContext, useContext, useState, useEffect } from "react";

const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Saving Favorite logic
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
       setFavorites(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (shoe) => {
    setFavorites(prev => {
      const exists = prev.some(fav => fav.id === shoe.id);
      if (!exists) {
        return [...prev, shoe];
      }
      return prev;
    });
  }

  const removeFavorite = (shoe) => {
    setFavorites(prev => prev.filter(fav => fav.id !== shoe.id));
  } 

  const toggleFavorite = (shoe) => {
    const favorited = favorites.some(fav => fav.id === shoe.id);
    if (favorited) {
      removeFavorite(shoe);
    } else {
      addFavorite(shoe);
    }
  }

  const isFavorite = (shoe) => {
    return favorites.some(fav => fav.id === shoe.id);
  }

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoriteProvider");
  }
  return context;
}
