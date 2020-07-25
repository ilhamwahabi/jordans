import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Jobs from "./views";
import JobsDetail from "./views/detail";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Jobs />
        </Route>
        <Route path="/:id" exact>
          <JobsDetail />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
