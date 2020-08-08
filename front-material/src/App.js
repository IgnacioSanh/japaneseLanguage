import React, { useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import PrivateRoute from "./Components/Common/PrivateRoute";
import Container from "@material-ui/core/Container";

import mainPage from "./Components/MaterialTuto/mainPage";
import Navbar from "./Components/Common/Navbar";
import Library from "./Components/Library/libraryView";
import Login from "./Components/Login/login";
import PracticeView from "./Components/Practice/PractiveView";
import Register from "./Components/Login/register";
import SecretPage from "./Components/MaterialTuto/secretPage";

import { AuthContext } from "./Context/auth";

const App = () => {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const currentUserLocalStorage = JSON.parse(localStorage.getItem("user"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  const [currentUser, setCurrentUser] = useState(currentUserLocalStorage);

  const setTokens = (token, user) => {
    localStorage.setItem("tokens", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(user));
    setAuthTokens(token);
    setCurrentUser(user);
  };

  return (
    <AuthContext.Provider
      value={{ authTokens, currentUser, setAuthTokens: setTokens }}
    >
      <BrowserRouter>
        <div id="app">
          <Navbar />
          <Container>
            <Switch>
              <PrivateRoute path="/practice" component={PracticeView} />
              <PrivateRoute path="/library" component={Library} />
              <PrivateRoute path="/secret" component={SecretPage} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/" exact component={mainPage} />
            </Switch>
          </Container>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
