import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const MainHeader = ({ guest }) => (
  <div className="mainHeader">
    <nav className="headerLinks">
      <Link to={"/"}><h3>ListWar</h3></Link>
      {
        guest ? (
          <div className="authLinks">
            <NavLink to={"/signin"} activeClassName="selected">Sign In</NavLink>
            <NavLink to={"/signup"} activeClassName="selected">Sign Up</NavLink>
          </div>
        ) : (
          <div className="authLinks">
            <NavLink to={"/signout"} activeClassName="selected">Sign Out</NavLink>
          </div>
        )
      }
    </nav>
  </div>
)

export default MainHeader