import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="title-bar center">
      Do you have got no idea how to deal with the remained veges? Search on{" "}
      <Link to="/SearchEngine" className="bold title-link">
        UsedUpRemaining
      </Link>{" "}
      for recipe.
    </div>
  );
}
