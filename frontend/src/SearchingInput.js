import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const SearchingInput = ({
  changeIngredients,
  setRecipeData,
  propsIngredients,
  setIngredients
}) => {
  const history = useHistory();
  const param = useParams();
  const host =
    process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";

  useEffect(() => {
    if (
      propsIngredients === undefined ||
      (propsIngredients === "" && param.ingredients)
    ) {
      setIngredients(param.ingredients);
    }
  }, []);

  const queryIngredients = () => {
    let url = host + "/searchengine/api";
    axios
      .get(url, {
        params: {
          ingredients: propsIngredients || param.ingredients
        }
      })
      .then(res => {
        setRecipeData(res.data);
        history.push(
          "/searchengine/list/" + (propsIngredients || param.ingredients)
        );
      });
  };

  useEffect(() => {
    if (param.ingredients) {
      queryIngredients();
    }
  }, []);

  return (
    <div>
      <input
        className="query-input"
        placeholder="UsedUpRemaining"
        value={propsIngredients}
        onChange={event => changeIngredients(event.target.value)}
      />
      <button onClick={queryIngredients}>Search</button>
    </div>
  );
};

export default SearchingInput;
