import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

export default function SearchingInput(props) {
  const history = useHistory();
  const param = useParams();

  const queryIngredients = () => {
    axios
      .get(`http://localhost:8080`, {
        params: {
          ingredients:
            props.ingredients === "" ? param.ingredients : props.ingredients
        }
      })
      .then(res => {
        props.setRecipeData(res.data);
        history.push(
          "/SearchEngine/list/" +
            (props.ingredients === "" ? param.ingredients : props.ingredients)
        );
      });
  };

  useEffect(() => {
    if (props.ingredients === "") {
      queryIngredients();
    }
  }, []);

  return (
    <div>
      <input
        className="query-input"
        placeholder="UsedUpRemaining"
        value={param.ingredients}
        onChange={event => props.changeIngredients(event.target.value)}
      />
      <button onClick={queryIngredients}>Search</button>
    </div>
  );
}
