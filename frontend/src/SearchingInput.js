import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const SearchingInput = ({ ingredients, setRecipeData, changeIngredients }) => {
  const history = useHistory();
  const param = useParams();

  const queryIngredients = () => {
    axios
      .get(`http://localhost:8080`, {
        params: {
          ingredients: ingredients === "" ? param.ingredients : ingredients
        }
      })
      .then(res => {
        setRecipeData(res.data);
        history.push(
          "/SearchEngine/list/" +
            (ingredients === "" ? param.ingredients : ingredients)
        );
      });
  };

  useEffect(() => {
    if (ingredients === "") {
      queryIngredients();
    }
  }, []);

  return (
    <div>
      <input
        className="query-input"
        placeholder="UsedUpRemaining"
        value={param.ingredients}
        onChange={event => changeIngredients(event.target.value)}
      />
      <button onClick={queryIngredients}>Search</button>
    </div>
  );
};

export default SearchingInput;
