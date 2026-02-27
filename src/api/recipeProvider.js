const API_URL = 'https://dummyjson.com/recipes';

export async function getAllRecipes() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data.recipes; 
  } catch (err) {
    console.error('Errore API:', err);
    return [];
  }
}

export async function searchRecipes(query) {
  const recipes = await getAllRecipes();
  return recipes.filter(r => r.name.toLowerCase().includes(query.toLowerCase()));
  
}