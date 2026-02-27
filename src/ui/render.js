import { getAllRecipes, searchRecipes } from "../api/recipeProvider.js";
import {  addToFavorites, removeFromFavorites, isFavorite } from "../services/storageService.js";


export function createRecipeCard(recipe) {
  const card = document.createElement("div");
  card.classList.add("recipe-card");

  const favorite = isFavorite(recipe.id);
  const calories = recipe.caloriesPerServing;
  let caloriesColor = "";
  if (calories < 400) caloriesColor = "green";
  else if (calories <= 800) caloriesColor = "orange";
  else caloriesColor = "red";

  card.innerHTML = `
    <img src="${recipe.image}" alt="${recipe.name}">
    <h3>${recipe.name}</h3>
    <div class="div1">
      <p><i class="fa-regular fa-clock"></i> ${recipe.prepTimeMinutes} min</p>
      <p>Calories: <span style="color:${caloriesColor}; font-weight:bold">${calories}</span></p>
    </div>
    <button class="fav-btn">
      <i class="${favorite ? "fa-solid" : "fa-regular"} fa-heart"></i>
    </button>
  `;


  const favBtn = card.querySelector(".fav-btn");
  const heartIcon = favBtn.querySelector("i");

  favBtn.addEventListener("click", (e) => {
    e.stopPropagation(); 
    if (isFavorite(recipe.id)) {
      removeFromFavorites(recipe.id);
      heartIcon.classList.remove("fa-solid");
      heartIcon.classList.add("fa-regular");
    } else {
      addToFavorites(recipe);
      heartIcon.classList.remove("fa-regular");
      heartIcon.classList.add("fa-solid");
    }
  });

  card.addEventListener("click", () => {
    showRecipeDetails(recipe);
  });

  return card;
}

export function showRecipeDetails(recipe) {
  const container = document.getElementById("repas");
  const details = document.getElementById("recipe-details");
  details.classList.add("recipe-card");
  

  container.innerHTML = "";

  document.getElementById("detail-image").src = recipe.image;
  document.getElementById("detail-name").textContent = recipe.name;
  document.getElementById("detail-time").textContent =
    "Temps : " + recipe.prepTimeMinutes + " min";
  document.getElementById("detail-calories").textContent =
    "Calories : " + recipe.caloriesPerServing;
  document.getElementById("ingredients").textContent="ingredients"+ recipe.ingredients.forEach((t) =>{
    `<li>${t}</li>`
  })

  details.classList.remove("hidden");
}
export async function renderRecipes(query = "") {
  const container = document.getElementById("repas");
  if (!container) return;

  container.innerHTML = "";

  const recipes = query
    ? await searchRecipes(query)
    : await getAllRecipes();

  recipes.forEach(recipe => {
    const card = createRecipeCard(recipe);
    container.appendChild(card);
  });
}

import { getFavorites } from "../services/storageService.js";

export function renderFavorites() {
  const container = document.getElementById("repas");
  container.innerHTML = "";

  const favorites = getFavorites();

  if (favorites.length === 0) {
    container.innerHTML = "<p>Aucun favori</p>";
    return;
  }

  favorites.forEach(recipe => {
    const card = createRecipeCard(recipe);
    container.appendChild(card);
  });
 
}