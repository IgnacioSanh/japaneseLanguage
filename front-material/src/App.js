import React from "react";
import { Switch, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";

import mainPage from "./Components/MaterialTuto/mainPage";
import Navbar from "./Components/Common/Navbar";
import TreePage from "./Components/Tree/TreePage";
import Library from "./Components/Library/libraryView";
import Login from "./Components/Login/login";
import PracticeView from "./Components/Practice/PractiveView";

const App = () => {
  return (
    <div id="app">
      <Navbar />
      <Container>
        <Switch>
          <Route path="/tree" component={TreePage} />
          <Route path="/practice" component={PracticeView} />
          <Route path="/library" component={Library} />
          <Route path="/login" component={Login} />
          <Route path="/" exact component={mainPage} />
        </Switch>
      </Container>
    </div>
  );
};

export default App;
