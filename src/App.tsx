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
  const [jobs, setJobs] = useState<IJob[]>([]);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Jobs jobs={jobs} setJobs={setJobs} />
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
