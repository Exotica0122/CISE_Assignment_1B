import React from "react";
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

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
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
              <Moderator />
            </Route>
            <Route exact path="/analyst">
              <Analyst />
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
