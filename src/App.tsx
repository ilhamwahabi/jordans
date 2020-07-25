import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Jobs from "./views";
import JobsDetail from "./views/detail";
import { IJob } from "./interfaces";

function App() {
  const [jobs] = useState<IJob[]>([]);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Jobs />
        </Route>
        <Route path="/:id" exact>
          <JobsDetail jobs={jobs} />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
