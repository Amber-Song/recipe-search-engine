import React from "react";

const ResultContent = ({ receivedRecipes }) => {
  let recipes = Object.values(receivedRecipes);
  recipes.sort(function(a, b) {
    return b.Importance - a.Importance;
  });

  let recipeList = recipes.map(recipe => {
    return (
      <div key={recipe.Id} className="recipe-list__recipe">
        <div className="recipe-list__title">
          <a href={recipe.Link}>{recipe.Name}</a>
        </div>
        <div className="recipe-list__ingredients">
          <span className="recipe-list__title">Ingredients: </span>
          {recipe.Ingredients}
        </div>
      </div>
    );
  });

  return (
    <main className="main-content">
      There are {recipes.length} results.
      <br />
      {recipeList}
    </main>
  );
};

export default ResultContent;
