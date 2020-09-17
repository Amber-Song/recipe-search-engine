import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      Do you have got no idea how to deal with the remained veges? Search on{" "}
      <Link to="/SearchEngine" className="bold title-link">
        UsedUpRemaining
      </Link>{" "}
      for recipe.
    </div>
  );
}

export default Header;
