import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Home from "./views";
import Jobs from "./views/jobs";
import JobsDetail from "./views/jobs/detail";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/jobs" exact component={Jobs} />
        <Route path="/jobs/:id" exact component={JobsDetail} />
      </Switch>
    </Router>
  );
}

export default App;
