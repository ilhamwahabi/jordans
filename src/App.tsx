import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Jobs from "./views";
import JobsDetail from "./views/detail";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Jobs} />
        <Route path="/:id" exact component={JobsDetail} />
      </Switch>
    </Router>
  );
}

export default App;
