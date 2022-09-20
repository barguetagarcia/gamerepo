import React from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/home";
import AddComment from "./components/add-comment";
import Games from "./components/games";
import GamesList from "./components/games-list";
import Login from "./components/login";

function App() {
   const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  return (
    <div>
      <BrowserRouter>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/home" className="navbar-brand">
          Brian's Games
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
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
      <div className="container mt-3">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/games" element={<GamesList />} />
          <Route path="/games/:id/comments" element={<AddComment render={(props) => ({...props})} user={user} />} />
          <Route path="/games/:id" element={<Games render={(props) => ({...props})} user={user} />} />
          <Route path="/login" element={<Login render={(props) => ({...props})} login={login} />} />
        </Routes>
      </div>
          </BrowserRouter>
    </div>
  )
}

export default App;
