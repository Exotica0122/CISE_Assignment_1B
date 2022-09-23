import React from "react";
import {
    Route,
    Switch,
    NavLink,
    BrowserRouter as Router,
    Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import SEPractice from "./pages/SE-Practice";
import SubmitArticle from "./pages/Submit-Article";
import NotFoundPage from "./pages/404";
import Moderator from "./pages/Moderator";

const App = () => {
    return (
        <Router>
            <div>
                <h1>Software Engineering Empirical Evidence Database (SEED)</h1>
                <ul className="header">
                    <li>
                        <NavLink exact to="/">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/SEPractice">Select the Practice</NavLink>
                    </li>
                    <li>
                        <NavLink to="/SubmitArticle">Submit an Article</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin">Moderator Page</NavLink>
                    </li>
                </ul>
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
