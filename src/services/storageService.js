const FAVORITES_KEY = "favorites";

export function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

export function addToFavorites(recipe) {
  const favorites = getFavorites();

  const exists = favorites.find(r => r.id === recipe.id);
  if (!exists) {
    favorites.push(recipe);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFromFavorites(id) {
  const favorites = getFavorites().filter(r => r.id !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavorite(id) {
  const favorites = getFavorites();
  return favorites.some(r => r.id === id);
}