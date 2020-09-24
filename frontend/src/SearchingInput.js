import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const SearchingInput = ({ ingredients, setIngredients, setRecipeData }) => {
  const history = useHistory();
  const host =
    process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";

  const fetchQuery = query => {
    let url = host + "/searchengine/api";

    axios
      .get(url, {
        params: {
          ingredients: query
        }
      })
      .then(res => {
        setRecipeData(res.data);
      });
  };

  const queryIngredients = query => {
    fetchQuery(query);
    history.push("/searchengine/list/" + query);
  };

  const queryIngredientsByEnter = (keyCode, query) => {
    if (keyCode === 13) {
      queryIngredients(query);
    }
  };

  useEffect(() => {
    fetchQuery(ingredients);
  }, []);

  return (
    <div>
      <input
        className="query-input"
        placeholder="UsedUpRemaining"
        value={ingredients}
        onChange={event => setIngredients(event.target.value)}
        onKeyDown={event => queryIngredientsByEnter(event.keyCode, ingredients)}
      />
      <button onClick={() => queryIngredients(ingredients)}>Search</button>
    </div>
  );
};

export default SearchingInput;
