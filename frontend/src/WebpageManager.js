import React, { useState } from "react";
import { useParams } from "react-router-dom";

import HeaderComponent from "./header";
import SearchingInput from "./SearchingInput";
import InputRequirement from "./InputRequirement";
import ResultContent from "./ResultContent";

function WebpageManager() {
  // Manage data
  const [ingredients, setIngredients] = useState("");
  const [recipeData, setRecipeData] = useState({});
  const url = window.location.pathname;
  const param = useParams();

  if (ingredients === "" && param.ingredients) {
    setIngredients(param.ingredients);
  }

  // Return different webpage based on searching url including ingredients
  if (url.includes("/searchengine/list/")) {
    return (
      <div>
        <header className="title-bar center">
          <HeaderComponent />
          <SearchingInput
            ingredients={ingredients}
            setIngredients={setIngredients}
            setRecipeData={setRecipeData}
          />
        </header>

        <ResultContent receivedRecipes={recipeData} />
      </div>
    );
  } else {
    return (
      <div>
        <header className="title-bar center">
          <HeaderComponent />
        </header>

        <main className="index-content">
          <div className="center">
            <h1>UsedUpRemaining</h1>
            <SearchingInput
              ingredients={ingredients}
              setIngredients={setIngredients}
              setRecipeData={setRecipeData}
            />
            <InputRequirement />
          </div>
        </main>
      </div>
    );
  }
}

export default WebpageManager;
