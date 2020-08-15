import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Jobs from "./views";
import JobsDetail from "./views/detail";
import { Filter } from "./state";

function App() {
  return (
    <Router>
      <Switch>
        <Filter.Provider>
          <Route path="/" exact component={Jobs} />
          <Route path="/:id" exact component={JobsDetail} />
        </Filter.Provider>
      </Switch>
    </Router>
  );
}

export default App;
