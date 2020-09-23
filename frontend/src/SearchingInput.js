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

  useEffect(() => {
    if (param.ingredients) {
      fetchQuery(param.ingredients);
    }
  }, []);

  const queryIngredients = query => {
    fetchQuery(query);
    history.push("/searchengine/list/" + query);
  };

  const enterQueryIngredients = event => {
    if (event.keyCode === 13) {
      queryIngredients(propsIngredients);
    }
  };

  return (
    <div>
      <input
        className="query-input"
        placeholder="UsedUpRemaining"
        value={propsIngredients}
        onChange={event => changeIngredients(event.target.value)}
        onKeyDown={event => enterQueryIngredients(event)}
      />
      <button onClick={() => queryIngredients(propsIngredients)}>Search</button>
    </div>
  );
};

export default SearchingInput;
