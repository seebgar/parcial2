import React from "react";
import "./App.css";

import "uikit/dist/css/uikit.min.css";
import "uikit/dist/js/uikit.min.js";
import "uikit/dist/js/uikit-icons.min.js";

import { Route, Switch } from "react-router-dom";
import Content from "../Content/Content";

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/list" component={Content} />
          <Route component={Content} />
        </Switch>
      </div>
    )
  }
}

export default App;
