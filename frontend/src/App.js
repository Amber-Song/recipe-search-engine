import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
  //   useHistory
} from "react-router-dom";
import axios from "axios";
import "./App.css";

import Header from "./header";
import ResultPage from "./resultPage";

function App() {
  //   const history = useHistory();
  const [ingredients, setIngredients] = useState("");
  const [recipeData, setRecipeData] = useState({});

  const changeIngredients = newIngredients => {
    setIngredients(newIngredients);
  };

  const queryIngredients = () => {
    axios
      .get(`http://localhost:8080`, {
        params: { ingredients: ingredients }
      })
      .then(res => {
        setRecipeData(res.data);
        // history.push("/SearchEngine/list");
        // TODO: how to jump to the next page?
      });
  };

  let inputBlock = (
    <div>
      <input
        className="query-input"
        placeholder="UsedUpRemaining"
        value={ingredients}
        onChange={event => changeIngredients(event.target.value)}
      />
      <button onClick={queryIngredients}>Search</button>
    </div>
  );

  return (
    <Router>
      <div className="page">
        <Switch>
          <Route path={`/SearchEngine/list`}>
            <div className="title-bar center">
              <Header />
              {inputBlock}
            </div>

            <div className="main-content">
              <ResultPage recipe={recipeData} className="main-content" />
            </div>
          </Route>

          <Route path={`/SearchEngine`}>
            <div className="title-bar center">
              <Header />
            </div>

            <div className="main-content">
              <div className="index-page">
                <div className="center">
                  <div className="title">UsedUpRemaining</div>

                  {inputBlock}

                  <ul>
                    <li>Type in 5 ingredients at most.</li>
                    <li>Separated with ",".</li>
                    <li>In the order that you want to use most to least</li>
                  </ul>
                </div>
              </div>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
