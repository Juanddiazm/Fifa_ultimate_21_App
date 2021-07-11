import React from "react";
import PlayerListPage from "./components/player/PlayerListPage";
import PlayerSearchByTeam from "./components/player/PlayerSearchByTeam";
import { history } from "./helpers/history";

import "rsuite/dist/styles/rsuite-default.css";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route  path="/players-list" component={PlayerListPage} />
          <Route  path="/players-search-by-team" component={PlayerSearchByTeam} />
          <Redirect from="*" to="/players-list" />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
