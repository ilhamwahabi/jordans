import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Home from "./views";
import Jobs from "./views/jobs";
import JobsDetail from "./views/jobs/detail";
import { Job } from "./interfaces";

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home setAuthenticated={setAuthenticated} />
        </Route>
        <Route path="/jobs" exact>
          <Jobs authenticated={authenticated} jobs={jobs} setJobs={setJobs} />
        </Route>
        <Route path="/jobs/:id" exact>
          <JobsDetail authenticated={authenticated} jobs={jobs} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
