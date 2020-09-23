import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Header from "./Header";
import SearchingInput from "./SearchingInput";
import InputRequirement from "./InputRequirement";
import ResultContent from "./ResultContent";

function App() {
  const [ingredients, setIngredients] = useState("");
  const [recipeData, setRecipeData] = useState({});

  document.title = "UsedUpRemaining";

  const changeIngredients = newIngredients => {
    setIngredients(newIngredients);
  };

  return (
    <Router>
      <div className="page">
        <Switch>
          <Route path={`/SearchEngine/list/:ingredients`}>
            <Header
              path=""
              changeIngredients={changeIngredients}
              setRecipeData={d => setRecipeData(d)}
              ingredients={ingredients}
            />

            <ResultContent recipe={recipeData} />
          </Route>

          <Route path={`/SearchEngine`}>
            <Header path="index" />

            <main className="index-content">
              <div className="center">
                <h1>UsedUpRemaining</h1>
                <SearchingInput
                  changeIngredients={changeIngredients}
                  setRecipeData={d => setRecipeData(d)}
                  ingredients={ingredients}
                />
                <InputRequirement />
              </div>
            </main>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
