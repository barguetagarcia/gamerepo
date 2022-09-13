import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddComment from "./components/add-comment";
import Games from "./components/games";
import GamesList from "./components/games-list";
import Login from "./components/login";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/games" className="navbar-brand">
          Games Comments
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/games"} className="nav-link">
              Games
            </Link>
          </li>
          <li className="nav-item" >
            { user ? (
              <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                Logout {user.name}
              </a>
            ) : (            
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
            )}

          </li>
        </div>
      </nav>
    </div>
  );
}

export default App;
