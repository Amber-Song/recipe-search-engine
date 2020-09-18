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
            <div className="title-bar center">
              <Header />
              <SearchingInput
                changeIngredients={changeIngredients}
                queryIngredients={queryIngredients}
                ingredients={ingredients}
              />
            </div>

            <ResultContent recipe={recipeData} />
          </Route>

          <Route path={`/SearchEngine`}>
            <Header />

            <div className="index-content">
              <div className="center">
                <div className="title">UsedUpRemaining</div>
                <SearchingInput
                  changeIngredients={changeIngredients}
                  queryIngredients={queryIngredients}
                  ingredients={ingredients}
                />
                <InputRequirement />
              </div>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
