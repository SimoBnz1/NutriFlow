import { getFavorites, removeFromFavorites } from "./services/storageService.js";
import { createRecipeCard } from "./ui/render.js";

const container = document.getElementById("favorites");

function renderFavorites() {
  const favorites = getFavorites();
  container.innerHTML = "";

  if (favorites.length === 0) {
    container.innerHTML = "<p>Aucun favori</p>";
    return;
  }
  favorites.forEach(recipe => {
    const card = createRecipeCard(recipe);
    const btn = card.querySelector(".fav-btn");
    btn.innerHTML = "";
    btn.addEventListener("click", () => {
      removeFromFavorites(recipe.id);
      renderFavorites();
    });

    container.appendChild(card);
  });
}

renderFavorites();