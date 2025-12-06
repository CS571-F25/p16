import { useState } from "react";


function FavoriteButton() {
  const [isFavorite, setFavorite] = useState(false);
  return (
    <button onClick={() => setFavorite(old => !old)} style={{ fontSize: '24px', border: 'none', background: 'none' }}>
      {isFavorite ? "★" : "☆"}
    </button>
  );
}

export default FavoriteButton;