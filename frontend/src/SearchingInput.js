import React from "react";

export default function SearchingInput(props) {
  return (
    <div>
      <input
        className="query-input"
        placeholder="UsedUpRemaining"
        value={props.ingredients}
        onChange={event => props.changeIngredients(event.target.value)}
      />
      <button onClick={props.queryIngredients}>Search</button>
    </div>
  );
}
