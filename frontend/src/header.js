import React from "react";
import { Link } from "react-router-dom";

import SearchingInput from "./SearchingInput";

const Header = ({ path, changeIngredients, setRecipeData, ingredients }) => {
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
    path === "index" ? (
      <header className="title-bar center">{indexHeader}</header>
    ) : (
      <header className="title-bar center">
        {indexHeader}
        <SearchingInput
          changeIngredients={changeIngredients}
          setRecipeData={setRecipeData}
          ingredients={ingredients}
        />
      </header>
    );

  return header;
};

export default Header;
