let recipes = [];
let editingIndex = -1; // Keep track of the index being edited

function submitRecipe() {
  const recipeName = document.getElementById("recipeName").value;
  const ingredients = document.getElementById("ingredients").value;
  const instructions = document.getElementById("instructions").value;

  if (recipeName && ingredients && instructions) {
    const recipe = { name: recipeName, ingredients, instructions };

    if (editingIndex !== -1) {
      // Editing an existing recipe
      recipes[editingIndex] = recipe;
      editingIndex = -1; // Reset editing index after update
    } else {
      // Adding a new recipe
      recipes.push(recipe);
    }

    displayRecipes();
    clearForm();
  } else {
    alert("Please fill in all fields");
  }
}

function deleteRecipe(index) {
  recipes.splice(index, 1);
  displayRecipes();
  clearForm();
}

function editRecipe(index) {
  const recipe = recipes[index];
  document.getElementById("recipeName").value = recipe.name;
  document.getElementById("ingredients").value = recipe.ingredients;
  document.getElementById("instructions").value = recipe.instructions;
  document.getElementById("submitBtn").innerText = "Update Recipe";
  editingIndex = index; // Set the editing index
}

function clearForm() {
  document.getElementById("recipeForm").reset();
  document.getElementById("submitBtn").innerText = "Add Recipe";
  editingIndex = -1; // Reset editing index
}

function displayRecipeDetails(index) {
  const clickedElement = event.target;

  if (clickedElement.tagName !== "BUTTON") {
    const recipe = recipes[index];
    const detailsSection = document.getElementById("recipe-details");
    detailsSection.innerHTML = `
          <h2>${recipe.name}</h2>
          <div class="details-content">
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
          </div>
          <button onclick="closeRecipeDetails()">Close</button>
      `;
    detailsSection.style.display = "block";
    document.getElementById("recipe-form").style.display = "none";
    document.getElementById("submitBtn").style.display = "none";
  }
}

function closeRecipeDetails() {
  document.getElementById("recipe-details").style.display = "none";
  document.getElementById("recipe-form").style.display = "block";
  document.getElementById("submitBtn").style.display = "block";
}

function displayRecipes() {
  const recipeList = document.getElementById("recipe-list");
  recipeList.innerHTML = "";

  recipes.forEach((recipe, index) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");
    recipeCard.innerHTML = `
            <h3 id="recipe-card-text">${recipe.name}</h3>
            <p><img id="recipe-card-img" src="/assets/ingredient.jpg" alt="ingredients " height="20px" width="20" />${truncateText(
              recipe.ingredients,
              60
            )}</p>
            <button onclick="editRecipe(${index})">Edit Recipe</button>
        `;
    recipeCard.addEventListener("click", () => displayRecipeDetails(index));
    recipeList.appendChild(recipeCard);
  });
}

function truncateText(text, maxLength) {
  return text.length > maxLength
    ? text.substring(0, maxLength - 3) + "..."
    : text;
}

function filterRecipes() {
  const searchTerm = document.getElementById("searchBar").value.toLowerCase();
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm)
  );
  displayFilteredRecipes(filteredRecipes);
}

function displayFilteredRecipes(filteredRecipes) {
  const recipeList = document.getElementById("recipe-list");
  recipeList.innerHTML = "";

  filteredRecipes.forEach((recipe, index) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");
    recipeCard.innerHTML = `
            <h3 id="recipe-card-text>${recipe.name}</h3>
            <p>${truncateText(recipe.ingredients, 60)}</p>
            <button onclick="editRecipe(${index})">Edit Recipe</button>
        `;
    recipeCard.addEventListener("click", () => displayRecipeDetails(index));
    recipeList.appendChild(recipeCard);
  });
}

// Initial display
displayRecipes();

// ... (remaining JavaScript)
