import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import WebpageManager from "./WebpageManager";

function App() {
  document.title = "UsedUpRemaining";

  return (
    <Router>
      <div className="page">
        <Switch>
          <Route path={`/searchengine/list/:ingredients`}>
            <WebpageManager />
          </Route>

          <Route path={`/searchengine`}>
            <WebpageManager />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
