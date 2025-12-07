import { useFavorites } from "../contexts/FavoriteContext";

function FavoriteButton({ shoe }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(shoe);

  return (
    <button 
      onClick={() => toggleFavorite(shoe)} 
      style={{ fontSize: '24px', border: 'none', background: 'none', cursor: 'pointer' }}
    >
      {favorited ? "★" : "☆"}
    </button>
  );
}

export default FavoriteButton;