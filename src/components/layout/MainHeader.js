import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const MainHeader = ({ guest }) => (
  <div className="MainHeader">
    <nav className="headerLinks">
      <div >
        <Link className="logo"
              to={"/"}>ListWar</Link>
      </div>
      {
        guest ? (
          <div className="authLinks">
            <NavLink className="nes-text is-normal header-link"
                     to={"/signin"} 
                    activeClassName="is-success">Sign In</NavLink>
            <NavLink className="nes-text is-normal header-link"
                     to={"/signup"} 
                     activeClassName="is-success">Sign Up</NavLink>
          </div>
        ) : (
          <div className="authLinks">
            <NavLink className="nes-text is-normal header-link"
                     to={"/signout"} 
                     activeClassName="is-success">Sign Out</NavLink>
          </div>
        )
      }
    </nav>
  </div>
)

export default MainHeader