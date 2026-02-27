import { renderRecipes } from "./ui/render.js";
import { renderFavorites } from "./ui/render.js";

document.addEventListener("DOMContentLoaded", () => {

  renderRecipes(); // HOME default
   const details = document.getElementById("recipe-details");

  const searchInput = document.getElementById("search-input");
  const homeBtn = document.getElementById("home-btn");
  const favBtn = document.getElementById("fav-btn");

  searchInput.addEventListener("input", (e) => {
    renderRecipes(e.target.value.toLowerCase());
  });

  homeBtn.addEventListener("click", () => {
    renderRecipes();
    homeBtn.classList.add("active");
    favBtn.classList.remove("active");
    details.classList.add("hidden");
  });

  favBtn.addEventListener("click", () => {
    renderFavorites();
    favBtn.classList.add("active");
    homeBtn.classList.remove("active");
  });
});