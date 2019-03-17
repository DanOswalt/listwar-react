import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ pageTitle }) => (
  <div className="Header">
    <div className="top nes-container is-centered is-dark is-rounded">
      <Link to={"/"}>
        <h2 className="logo">Super ListWar</h2>
      </Link>
    </div>
    <h4 className="pageTitle">{pageTitle}</h4>
  </div>
)

export default Header