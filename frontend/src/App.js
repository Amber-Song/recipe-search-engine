import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import axios from "axios";
import "./App.css";

import Header from "./Header";
import SearchingInput from "./SearchingInput";
import InputRequirement from "./InputRequirement";
import ResultContent from "./ResultContent";

function App() {
  const history = useHistory();
  console.log("History: ", history);
  const [ingredients, setIngredients] = useState("");
  const [recipeData, setRecipeData] = useState({});

  document.title = "UsedUpRemaining";

  const changeIngredients = newIngredients => {
    setIngredients(newIngredients);
  };

  const queryIngredients = path => {
    axios
      .get(`http://localhost:8080`, {
        params: { ingredients: ingredients }
      })
      .then(res => {
        setRecipeData(res.data);
        console.log("Path: ", path);
        // TODO: how to jump to the next page?
      });
  };

  return (
    <Router>
      <div className="page">
        <Switch>
          <Route path={`/SearchEngine/list`}>
            <Header
              path=""
              changeIngredients={changeIngredients}
              queryIngredients={queryIngredients}
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
                  queryIngredients={queryIngredients}
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
