import React from "react";
import { Link } from "react-router-dom";

import SearchingInput from "./SearchingInput";

export default function Header(props) {
  const indexHeader = (
    <div>
      Do you have got no idea how to deal with the remained veges? Search on{" "}
      <Link to="/SearchEngine" className="bold title-link">
        UsedUpRemaining
      </Link>{" "}
      for recipe.
    </div>
  );

  const header =
    props.path === "index" ? (
      <header className="title-bar center">{indexHeader}</header>
    ) : (
      <header className="title-bar center">
        {indexHeader}
        <SearchingInput
          changeIngredients={props.changeIngredients}
          setRecipeData={props.setRecipeData}
          ingredients={props.ingredients}
        />
      </header>
    );

  return header;
}
