import React, { useState } from 'react'
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import SEPractice from "./pages/SE-Practice";
import SubmitArticle from "./pages/Submit-Article";
import NotFoundPage from "./pages/404";
import Moderator from "./pages/Moderator";
import Analyst from "./pages/Analyst";

import NavBar from "./components/NavBar";
import LoginForm from "./pages/LoginForm";


const App = () => {
  const [loggedUser, setLoggedUser] = useState({ name: "", type: "" });
  const [qtyPendingItems, setQtyPendingItems] = useState(0);

  const onLogin = (userName, userType, qtyPendingItems) => {
    setLoggedUser({ name: userName, type: userType });
    setQtyPendingItems(qtyPendingItems);
  }

  const getUserDetail = () => {
    return { name: loggedUser.name, type: loggedUser.type };
  }

  return (
    <Router>
      <div>
        <NavBar currentUser={getUserDetail()} qtyPendingItems={qtyPendingItems} />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/SEPractice">
              <SEPractice />
            </Route>
            <Route path="/SubmitArticle">
              <SubmitArticle />
            </Route>
            <Route exact path="/admin">
              <Moderator currentUser={getUserDetail()} />
            </Route>
            <Route exact path="/analyst">
              <Analyst currentUser={getUserDetail()}  />
            </Route>

            <Route exact path="/LoginForm">
              <LoginForm onLogin={onLogin} currentUser={getUserDetail()} />
            </Route>

            <Route exact path="/404">
              <NotFoundPage />
            </Route>

            <Redirect to="/404" />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
